import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Bắt đầu seed database...')

  // ============================================================
  // Xóa dữ liệu cũ (theo thứ tự để tránh FK constraint)
  // ============================================================
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.review.deleteMany()
  await prisma.address.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()

  console.log('🗑️  Đã xóa dữ liệu cũ')

  // ============================================================
  // USERS
  // ============================================================
  const hashedPassword = await bcrypt.hash('password123', 12)

  const admin = await prisma.user.create({
    data: {
      email: 'admin@laptopstore.vn',
      password: hashedPassword,
      name: 'Admin LaptopStore',
      phone: '0901234567',
      role: 'ADMIN',
    },
  })

  const customer1 = await prisma.user.create({
    data: {
      email: 'nguyen.van.a@gmail.com',
      password: hashedPassword,
      name: 'Nguyễn Văn A',
      phone: '0912345678',
    },
  })

  const customer2 = await prisma.user.create({
    data: {
      email: 'tran.thi.b@gmail.com',
      password: hashedPassword,
      name: 'Trần Thị B',
      phone: '0923456789',
    },
  })

  console.log('👥 Đã tạo 3 users (1 admin + 2 customers)')

  // ============================================================
  // PRODUCTS — Gaming
  // ============================================================
  const gamingProducts = await Promise.all([
    prisma.product.create({
      data: {
        slug: 'asus-rog-strix-g15-rtx4060-2025',
        name: 'ASUS ROG Strix G15 RTX 4060 2025',
        description: 'Laptop gaming cao cấp với RTX 4060, màn hình 144Hz, thiết kế chiến binh.',
        price: 22990000,
        originalPrice: 25990000,
        category: 'gaming',
        brand: 'ASUS',
        specs: {
          cpu: 'Intel Core i7-13700H (24MB Cache, up to 5.0GHz)',
          gpu: 'NVIDIA GeForce RTX 4060 8GB GDDR6',
          ram: '16GB DDR5 4800MHz (2x8GB)',
          storage: '512GB PCIe NVMe M.2 SSD',
          displaySize: '15.6"',
          displayResolution: '1920x1080 (FHD)',
          displayRefresh: '144Hz',
          displayPanel: 'IPS-level',
          battery: '90WHr',
          batteryLife: '6-8 giờ',
          chargerWatt: '240W',
          weight: '2.3kg',
          os: 'Windows 11 Home',
          ports: '1x USB 3.2 Gen 2 Type-C, 3x USB 3.2 Gen 1 Type-A, 1x HDMI 2.1',
          connectivity: 'Intel Wi-Fi 6E (802.11ax), Bluetooth 5.3',
          warranty: '12 tháng tại ASUS Việt Nam',
        },
        stock: 15,
        status: 'ACTIVE',
        soldCount: 234,
        viewCount: 1547,
        images: {
          create: [
            {
              url: 'https://res.cloudinary.com/demo/image/upload/v1/laptop-store/asus-rog-g15-front',
              publicId: 'laptop-store/asus-rog-g15-front',
              isHero: true,
              displayOrder: 1,
            },
            {
              url: 'https://res.cloudinary.com/demo/image/upload/v1/laptop-store/asus-rog-g15-back',
              publicId: 'laptop-store/asus-rog-g15-back',
              isHero: false,
              displayOrder: 2,
            },
            {
              url: 'https://res.cloudinary.com/demo/image/upload/v1/laptop-store/asus-rog-g15-side',
              publicId: 'laptop-store/asus-rog-g15-side',
              isHero: false,
              displayOrder: 3,
            },
          ],
        },
      },
    }),

    prisma.product.create({
      data: {
        slug: 'msi-katana-15-rtx4070-2025',
        name: 'MSI Katana 15 RTX 4070 2025',
        description: 'Laptop gaming mạnh mẽ với RTX 4070, hiệu năng đỉnh cao cho game và đồ họa.',
        price: 29990000,
        originalPrice: 33990000,
        category: 'gaming',
        brand: 'MSI',
        specs: {
          cpu: 'Intel Core i9-13900H (24MB Cache, up to 5.4GHz)',
          gpu: 'NVIDIA GeForce RTX 4070 8GB GDDR6',
          ram: '32GB DDR5 4800MHz',
          storage: '1TB PCIe NVMe SSD',
          displaySize: '15.6"',
          displayResolution: '2560x1440 (QHD)',
          displayRefresh: '165Hz',
          displayPanel: 'IPS',
          battery: '86WHr',
          batteryLife: '5-7 giờ',
          chargerWatt: '280W',
          weight: '2.35kg',
          os: 'Windows 11 Home',
          ports: '2x USB-A 3.2, 1x USB-C, 1x HDMI 2.1, 1x miniDP 1.4',
          connectivity: 'Intel Wi-Fi 6E, Bluetooth 5.3',
          warranty: '12 tháng tại MSI Việt Nam',
        },
        stock: 8,
        status: 'ACTIVE',
        soldCount: 87,
        viewCount: 892,
        images: {
          create: [
            {
              url: 'https://res.cloudinary.com/demo/image/upload/v1/laptop-store/msi-katana-front',
              publicId: 'laptop-store/msi-katana-front',
              isHero: true,
              displayOrder: 1,
            },
          ],
        },
      },
    }),

    prisma.product.create({
      data: {
        slug: 'lenovo-legion-5-rtx4060-2025',
        name: 'Lenovo Legion 5 Gen 9 RTX 4060',
        description: 'Laptop gaming cân bằng giữa hiệu năng và pin bền. Lý tưởng cho game thủ di động.',
        price: 21490000,
        originalPrice: 23990000,
        category: 'gaming',
        brand: 'Lenovo',
        specs: {
          cpu: 'AMD Ryzen 7 7745HX (up to 5.1GHz)',
          gpu: 'NVIDIA GeForce RTX 4060 8GB',
          ram: '16GB DDR5',
          storage: '512GB SSD',
          displaySize: '15.6"',
          displayResolution: '1920x1080',
          displayRefresh: '144Hz',
          displayPanel: 'IPS',
          battery: '80WHr',
          batteryLife: '7-9 giờ',
          chargerWatt: '170W',
          weight: '2.38kg',
          os: 'Windows 11 Home',
          warranty: '12 tháng tại Lenovo Việt Nam',
        },
        stock: 12,
        status: 'ACTIVE',
        soldCount: 156,
        viewCount: 1203,
        images: {
          create: [
            {
              url: 'https://res.cloudinary.com/demo/image/upload/v1/laptop-store/legion5-front',
              publicId: 'laptop-store/legion5-front',
              isHero: true,
              displayOrder: 1,
            },
          ],
        },
      },
    }),

    prisma.product.create({
      data: {
        slug: 'dell-g15-5530-rtx4050-2025',
        name: 'Dell G15 5530 RTX 4050',
        description: 'Laptop gaming entry-level giá tốt, phù hợp sinh viên muốn chơi game.',
        price: 18490000,
        originalPrice: 20990000,
        category: 'gaming',
        brand: 'Dell',
        specs: {
          cpu: 'Intel Core i5-13450HX',
          gpu: 'NVIDIA GeForce RTX 4050 6GB',
          ram: '16GB DDR5',
          storage: '512GB SSD',
          displaySize: '15.6"',
          displayResolution: '1920x1080',
          displayRefresh: '120Hz',
          displayPanel: 'WVA',
          battery: '54WHr',
          weight: '2.81kg',
          os: 'Windows 11 Home',
          warranty: '12 tháng Dell Việt Nam',
        },
        stock: 20,
        status: 'ACTIVE',
        soldCount: 312,
        viewCount: 2100,
        images: {
          create: [
            {
              url: 'https://res.cloudinary.com/demo/image/upload/v1/laptop-store/dell-g15-front',
              publicId: 'laptop-store/dell-g15-front',
              isHero: true,
              displayOrder: 1,
            },
          ],
        },
      },
    }),

    prisma.product.create({
      data: {
        slug: 'acer-predator-helios-neo-16-2025',
        name: 'Acer Predator Helios Neo 16 RTX 4070',
        description: 'Màn hình 16" WUXGA 165Hz, hiệu năng gaming top tier với giá cạnh tranh.',
        price: 27990000,
        originalPrice: 30990000,
        category: 'gaming',
        brand: 'Acer',
        specs: {
          cpu: 'Intel Core i7-14700HX',
          gpu: 'NVIDIA GeForce RTX 4070 8GB',
          ram: '32GB DDR5',
          storage: '1TB SSD',
          displaySize: '16"',
          displayResolution: '1920x1200 (WUXGA)',
          displayRefresh: '165Hz',
          displayPanel: 'IPS',
          battery: '90WHr',
          weight: '2.7kg',
          os: 'Windows 11 Home',
          warranty: '12 tháng Acer Việt Nam',
        },
        stock: 6,
        status: 'ACTIVE',
        soldCount: 45,
        viewCount: 678,
        images: {
          create: [
            {
              url: 'https://res.cloudinary.com/demo/image/upload/v1/laptop-store/predator-helios-front',
              publicId: 'laptop-store/predator-helios-front',
              isHero: true,
              displayOrder: 1,
            },
          ],
        },
      },
    }),
  ])

  // ============================================================
  // PRODUCTS — Office / Business
  // ============================================================
  const officeProducts = await Promise.all([
    prisma.product.create({
      data: {
        slug: 'lenovo-thinkpad-x1-carbon-gen12-2025',
        name: 'Lenovo ThinkPad X1 Carbon Gen 12',
        description: 'Ultrabook doanh nhân cao cấp, siêu nhẹ 1.12kg, bảo mật vPro, pin 15 giờ.',
        price: 39990000,
        originalPrice: 44990000,
        category: 'office',
        brand: 'Lenovo',
        specs: {
          cpu: 'Intel Core Ultra 7 165U (up to 4.9GHz)',
          gpu: 'Intel Graphics',
          ram: '32GB LPDDR5x',
          storage: '1TB PCIe SSD',
          displaySize: '14"',
          displayResolution: '2880x1800 (2.8K OLED)',
          displayPanel: 'OLED',
          battery: '57WHr',
          batteryLife: '15 giờ',
          chargerWatt: '65W USB-C',
          weight: '1.12kg',
          os: 'Windows 11 Pro',
          ports: '2x Thunderbolt 4, 2x USB-A 3.2, HDMI 2.1',
          connectivity: 'Intel Wi-Fi 6E, Bluetooth 5.3, 4G LTE (tùy chọn)',
          warranty: '12 tháng Lenovo Việt Nam',
        },
        stock: 5,
        status: 'ACTIVE',
        soldCount: 32,
        viewCount: 845,
        images: {
          create: [
            {
              url: 'https://res.cloudinary.com/demo/image/upload/v1/laptop-store/thinkpad-x1-front',
              publicId: 'laptop-store/thinkpad-x1-front',
              isHero: true,
              displayOrder: 1,
            },
          ],
        },
      },
    }),

    prisma.product.create({
      data: {
        slug: 'dell-xps-15-9530-2025',
        name: 'Dell XPS 15 9530 OLED',
        description: 'Laptop doanh nhân premium với màn hình OLED 3.5K, thiết kế tinh tế.',
        price: 45990000,
        originalPrice: 49990000,
        category: 'office',
        brand: 'Dell',
        specs: {
          cpu: 'Intel Core i7-13700H',
          gpu: 'NVIDIA GeForce RTX 4060 8GB',
          ram: '32GB DDR5',
          storage: '1TB SSD',
          displaySize: '15.6"',
          displayResolution: '3456x2160 (3.5K OLED)',
          displayPanel: 'OLED Touch',
          battery: '86WHr',
          batteryLife: '10-12 giờ',
          weight: '1.86kg',
          os: 'Windows 11 Pro',
          warranty: '12 tháng Dell Việt Nam',
        },
        stock: 4,
        status: 'ACTIVE',
        soldCount: 18,
        viewCount: 523,
        images: {
          create: [
            {
              url: 'https://res.cloudinary.com/demo/image/upload/v1/laptop-store/dell-xps15-front',
              publicId: 'laptop-store/dell-xps15-front',
              isHero: true,
              displayOrder: 1,
            },
          ],
        },
      },
    }),

    prisma.product.create({
      data: {
        slug: 'apple-macbook-pro-14-m4-2025',
        name: 'Apple MacBook Pro 14" M4 Pro 2025',
        description: 'MacBook Pro với chip M4 Pro mạnh nhất cho developer và creative professional.',
        price: 52990000,
        originalPrice: 56990000,
        category: 'office',
        brand: 'Apple',
        specs: {
          cpu: 'Apple M4 Pro (12-core CPU, 20-core GPU)',
          gpu: 'Apple M4 Pro 20-core GPU',
          ram: '24GB Unified Memory',
          storage: '512GB SSD',
          displaySize: '14.2"',
          displayResolution: '3024x1964 (Liquid Retina XDR)',
          displayPanel: 'Mini-LED ProMotion 120Hz',
          battery: '70WHr',
          batteryLife: '22 giờ',
          chargerWatt: '140W USB-C',
          weight: '1.61kg',
          os: 'macOS Sequoia',
          ports: '3x Thunderbolt 5, HDMI 2.1, SD card, MagSafe 3',
          warranty: '12 tháng Apple Việt Nam',
        },
        stock: 7,
        status: 'ACTIVE',
        soldCount: 67,
        viewCount: 2341,
        images: {
          create: [
            {
              url: 'https://res.cloudinary.com/demo/image/upload/v1/laptop-store/macbook-pro14-front',
              publicId: 'laptop-store/macbook-pro14-front',
              isHero: true,
              displayOrder: 1,
            },
          ],
        },
      },
    }),

    prisma.product.create({
      data: {
        slug: 'hp-elitebook-840-g11-2025',
        name: 'HP EliteBook 840 G11',
        description: 'Laptop doanh nhân HP với bảo mật vPro, chứng nhận MIL-STD-810H bền bỉ.',
        price: 28990000,
        originalPrice: 32990000,
        category: 'office',
        brand: 'HP',
        specs: {
          cpu: 'Intel Core Ultra 5 135U',
          gpu: 'Intel Graphics',
          ram: '16GB LPDDR5',
          storage: '512GB SSD',
          displaySize: '14"',
          displayResolution: '1920x1200 (WUXGA)',
          displayPanel: 'IPS',
          battery: '51WHr',
          batteryLife: '12 giờ',
          weight: '1.39kg',
          os: 'Windows 11 Pro',
          warranty: '12 tháng HP Việt Nam',
        },
        stock: 9,
        status: 'ACTIVE',
        soldCount: 43,
        viewCount: 671,
        images: {
          create: [
            {
              url: 'https://res.cloudinary.com/demo/image/upload/v1/laptop-store/hp-elitebook840-front',
              publicId: 'laptop-store/hp-elitebook840-front',
              isHero: true,
              displayOrder: 1,
            },
          ],
        },
      },
    }),

    prisma.product.create({
      data: {
        slug: 'asus-expertbook-b9-oled-2025',
        name: 'ASUS ExpertBook B9 OLED',
        description: 'Laptop văn phòng siêu nhẹ 880g, màn OLED, pin 66 giờ (với power bank).',
        price: 34990000,
        originalPrice: 38990000,
        category: 'office',
        brand: 'ASUS',
        specs: {
          cpu: 'Intel Core Ultra 7 155H',
          gpu: 'Intel Arc Graphics',
          ram: '32GB LPDDR5',
          storage: '1TB SSD',
          displaySize: '14"',
          displayResolution: '2880x1800 (OLED 2.8K)',
          displayPanel: 'OLED',
          battery: '63WHr',
          batteryLife: '14 giờ',
          weight: '880g',
          os: 'Windows 11 Pro',
          warranty: '12 tháng ASUS Việt Nam',
        },
        stock: 3,
        status: 'ACTIVE',
        soldCount: 21,
        viewCount: 489,
        images: {
          create: [
            {
              url: 'https://res.cloudinary.com/demo/image/upload/v1/laptop-store/asus-expertbook-b9-front',
              publicId: 'laptop-store/asus-expertbook-b9-front',
              isHero: true,
              displayOrder: 1,
            },
          ],
        },
      },
    }),
  ])

  console.log(`✅ Đã tạo ${gamingProducts.length} gaming + ${officeProducts.length} office products`)

  // ============================================================
  // REVIEWS — Cho sản phẩm đầu tiên
  // ============================================================
  await prisma.review.createMany({
    data: [
      {
        productId: gamingProducts[0].id,
        userId: customer1.id,
        rating: 5,
        title: 'Laptop gaming tuyệt vời!',
        content: 'Máy mạnh, chơi game mượt, màn hình đẹp. Rất hài lòng với sản phẩm.',
        images: JSON.stringify([]),
        isVerifiedPurchase: true,
      },
      {
        productId: gamingProducts[0].id,
        userId: customer2.id,
        rating: 4,
        title: 'Tốt nhưng hơi nóng',
        content: 'Hiệu năng ổn, tuy nhiên máy hơi nóng khi chơi game lâu. Ngoài ra rất hài lòng.',
        images: JSON.stringify([]),
        isVerifiedPurchase: false,
      },
    ],
  })

  console.log('⭐ Đã tạo reviews')

  // ============================================================
  // ADDRESSES
  // ============================================================
  await prisma.address.create({
    data: {
      userId: customer1.id,
      recipientName: 'Nguyễn Văn A',
      phone: '0912345678',
      province: 'TP. Hồ Chí Minh',
      district: 'Quận 1',
      ward: 'Phường Bến Nghé',
      detail: '123 Nguyễn Huệ',
      isDefault: true,
    },
  })

  console.log('📍 Đã tạo địa chỉ')

  console.log(`
🎉 Seed hoàn thành!

👤 Test accounts:
   Admin:    admin@laptopstore.vn / password123
   User 1:   nguyen.van.a@gmail.com / password123
   User 2:   tran.thi.b@gmail.com / password123

📦 Products: ${gamingProducts.length} gaming + ${officeProducts.length} office = ${gamingProducts.length + officeProducts.length} total
  `)
}

main()
  .catch((e) => {
    console.error('❌ Seed thất bại:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
