import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize filename
        const filename = file.name.replace(/\s+/g, '-').toLowerCase();
        const uniqueFilename = `${Date.now()}-${filename}`;
        
        const uploadDir = path.join(process.cwd(), 'public/images/products');
        
        // Ensure directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, uniqueFilename);
        fs.writeFileSync(filePath, buffer);

        return NextResponse.json({ 
            success: true, 
            path: `/images/products/${uniqueFilename}` 
        });
    } catch (error) {
        console.error('Error during file upload:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
