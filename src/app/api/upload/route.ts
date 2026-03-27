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
    console.log('API: Upload - Target directory:', uploadDir);
    
    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      console.log('API: Upload - Creating directory...');
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, uniqueFilename);
    console.log('API: Upload - Writing file to:', filePath);
    fs.writeFileSync(filePath, buffer);
    console.log('API: Upload - Success!');

    return NextResponse.json({ 
      success: true, 
      path: `/images/products/${uniqueFilename}` 
    });
  } catch (error: any) {
    console.error('API: Upload - CRITICAL ERROR:', {
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json({ error: `Upload falhou: ${error.message}` }, { status: 500 });
  }
}
