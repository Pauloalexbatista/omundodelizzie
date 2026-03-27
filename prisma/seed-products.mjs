import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding products...')

  const products = [
    {
      name: 'Fralda Bordada "Dinis"',
      type: 'Bebé',
      price: 18.50,
      description: 'Fralda de pano de alta qualidade, bordada à mão com o nome e desenhos delicados.',
      image: '/images/products/fralda-exemplo.jpg',
      is_weekly_highlight: true,
      weekly_highlight_image: '/images/products/fralda-exemplo.jpg'
    },
    {
      name: 'Babete Personalizado Rosa',
      type: 'Bebé',
      price: 12.00,
      description: 'Babete em algodão com fecho de mola, personalizado com iniciais.',
      image: '/images/products/babete-exemplo.jpg',
      is_weekly_highlight: false
    },
    {
      name: 'Conjunto de Saída de Maternidade',
      type: 'Bebé',
      price: 45.00,
      description: 'Conjunto completo com manta, gorro e botinhas, feito em malha suave.',
      image: '/images/products/fralda-exemplo.jpg',
      is_weekly_highlight: false
    }
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
