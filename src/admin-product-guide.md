# Admin API: Product Management Guide

With the removal of **SubCategories** and **Templates**, the Admin API has been simplified to a direct 2-tier hierarchy.

## 🏗️ Simplified Hierarchy

| **Old Way (3-Tier)** | **New Way (2-Tier)** | Result                 |
| -------------------- | -------------------- | ---------------------- |
| Category             | Category             | Unchanged              |
| SubCategory          | ❌ **DELETED**       | Merged into Product    |
| Template             | ❌ **DELETED**       | Renamed to **Product** |

---

## 1. Managing Categories

Endpoints remain virtually unchanged.

- `POST /v1/admin/products/categories` — Create a category.
- `GET /v1/admin/products/categories` — List all categories.
- `PATCH /v1/admin/products/categories/:id` — Update category.
- `DELETE /v1/admin/products/categories/:id` — Delete category.

---

## 2. Managing Products (The Big Change)

All endpoints previously under `/admin/product-sub-categories` and `/admin/product-templates` have been **retired**. You now manage **Products** directly.

### Endpoints:

- `POST /v1/admin/products` — Create a product.
- `GET /v1/admin/products` — List products (filter by `categoryId`).
- `GET /v1/admin/products/:id` — Get product details.
- `PATCH /v1/admin/products/:id` — Update product.
- `DELETE /v1/admin/products/:id` — Delete product.

### Create Product Example (`POST /v1/admin/products`):

The `Product` now holds the **Specifications** and **Addons** that hubs will use to create their offerings.

```json
{
  "categoryId": "category-uuid",
  "name": "Luxury Business Card",
  "description": "High-end cards with premium finishes.",
  "specifications": {
    "size": {
      "label": "Size",
      "options": ["Standard (3.5x2)", "Square (2.5x2.5)"],
      "base": "Standard (3.5x2)",
      "priceType": "FIXED"
    },
    "paper_type": {
      "label": "Paper Type",
      "options": ["350gsm Matte", "400gsm Gloss", "Recycled Paper"],
      "base": "350gsm Matte",
      "priceType": "PER_UNIT"
    }
  },
  "addons": [
    {
      "key": "spot_uv",
      "label": "Spot UV Finish",
      "description": "Adds a shiny layer to specific areas."
    },
    {
      "key": "foil_stamping",
      "label": "Foil Stamping",
      "description": "Metallic finish for logos or text."
    }
  ]
}
```

---

## 🚨 Breaking Changes for Admin Frontend

1.  **Remove SubCategory UI**: Delete any screens or components related to managing "SubCategories". Categories now contain Products directly.
2.  **Rename Template UI**: Rename "Template Management" to "Product Management".
3.  **Unified Creation Form**: The form that previously created a "Template" is now the form for creating a "Product". It must be associated with a `categoryId` instead of a `subCategoryId`.
4.  **Endpoint Redirection**:
    - Update all list views to use `GET /v1/admin/products`.
    - Update detail views to use `GET /v1/admin/products/:id`.
    - Update deletion logic to use `DELETE /v1/admin/products/:id`.

---

## 3. Querying Products

When displaying products, you can filter by category:

`GET /v1/admin/products?categoryId=...`

Returns an array of products: Sample product below

```json
{
  "data": [
    {
      "id": "f3304f24-961d-4f83-a169-24626817f21b",
      "categoryId": "bbf0db7f-72d1-4c3f-871a-8e7afbf5f528",
      "name": "Poster",
      "description": "High-quality printed visuals for promotions, events, or décor.",
      "specifications": {
        "size": {
          "base": "A5",
          "label": "Size",
          "options": ["A5", "A4", "A3", "A2"],
          "priceType": "PER_UNIT"
        },
        "finish": {
          "label": "Finish",
          "options": ["Matte", "Gloss"]
        },
        "orientation": {
          "label": "Orientation",
          "options": ["Landscape", "Portrait"]
        }
      },
      "addons": [],
      "createdAt": "2026-02-14T21:50:12.898Z",
      "updatedAt": "2026-02-14T21:50:12.898Z"
    },
    {
      "id": "1e3476cc-6879-4057-8b04-7f119988b8eb",
      "categoryId": "bbf0db7f-72d1-4c3f-871a-8e7afbf5f528",
      "name": "Poster Snapper Frame",
      "description": "Sleek aluminum frame system that holds posters securely and elevates their presentation.",
      "specifications": {
        "size": {
          "base": "A4",
          "label": "Size",
          "options": ["A4", "A3", "A2"],
          "priceType": "PER_UNIT"
        },
        "orientation": {
          "label": "Orientation",
          "options": ["Landscape", "Portrait"]
        }
      },
      "addons": [],
      "createdAt": "2026-02-14T21:50:13.213Z",
      "updatedAt": "2026-02-14T21:50:13.213Z"
    },
    {
      "id": "7ce88ec2-3516-432e-935b-8c53ba380dfb",
      "categoryId": "bbf0db7f-72d1-4c3f-871a-8e7afbf5f528",
      "name": "Handbill",
      "description": "Small, easy-to-share flyers ideal for quick promos, ads, and announcements.",
      "specifications": {
        "size": {
          "base": "A6",
          "label": "Size",
          "options": ["A6", "A5", "A4"],
          "priceType": "PER_UNIT"
        },
        "finish": {
          "label": "Finish",
          "options": ["Matte", "Gloss"]
        },
        "printing": {
          "base": "Single sided",
          "label": "Printing",
          "options": ["Single sided", "Double sided"],
          "priceType": "PER_UNIT"
        },
        "orientation": {
          "label": "Orientation",
          "options": ["Landscape", "Portrait"]
        }
      },
      "addons": [],
      "createdAt": "2026-02-14T21:50:13.510Z",
      "updatedAt": "2026-02-14T21:50:13.510Z"
    },
    {
      "id": "f0cbd9d7-7d3c-48f1-b257-a82e2c0edb44",
      "categoryId": "bbf0db7f-72d1-4c3f-871a-8e7afbf5f528",
      "name": "Custom Shape Die-Cut Sticker",
      "description": "Stickers cut into any unique shape to match your branding or design.",
      "specifications": {
        "material": {
          "base": "White Paper",
          "label": "Material",
          "options": ["White Paper", "Clear Plastic"],
          "priceType": "PER_UNIT"
        }
      },
      "addons": [],
      "createdAt": "2026-02-14T21:50:13.800Z",
      "updatedAt": "2026-02-14T21:50:13.800Z"
    },
    {
      "id": "b173cd42-8af2-41ac-82b9-ad97a79d7138",
      "categoryId": "bbf0db7f-72d1-4c3f-871a-8e7afbf5f528",
      "name": "Product Sticker Label",
      "description": "Durable labels for packaging and product information, branding, and barcoding.",
      "specifications": {
        "shape": {
          "label": "Shape",
          "options": [
            "Rounded Rectangle",
            "Rectangle",
            "Rounded Square",
            "Square",
            "Circle",
            "Oval"
          ]
        },
        "material": {
          "base": "White Paper",
          "label": "Material",
          "options": ["White Paper", "Clear Plastic"],
          "priceType": "PER_UNIT"
        }
      },
      "addons": [],
      "createdAt": "2026-02-14T21:50:14.090Z",
      "updatedAt": "2026-02-14T21:50:14.090Z"
    },
    {
      "id": "c5fb4fb7-c882-4cc6-95af-3d963a7377b4",
      "categoryId": "bbf0db7f-72d1-4c3f-871a-8e7afbf5f528",
      "name": "Standard Business Card",
      "description": "Professional business cards for networking, client meetings, events, and brand visibility.",
      "specifications": {
        "finish": {
          "label": "Finish",
          "options": ["Matte", "Gloss"]
        },
        "corners": {
          "base": "Standard",
          "label": "Corners",
          "options": ["Standard", "Rounded"],
          "priceType": "FIXED"
        },
        "printing": {
          "base": "Single sided",
          "label": "Printing",
          "options": ["Single sided", "Double sided"],
          "priceType": "PER_UNIT"
        },
        "paperStock": {
          "base": "300 gramms",
          "label": "Paper Stock",
          "options": ["300 gramms", "600 gramms"],
          "priceType": "PER_UNIT"
        }
      },
      "addons": [],
      "createdAt": "2026-02-14T21:50:14.385Z",
      "updatedAt": "2026-02-14T21:50:14.385Z"
    },
    {
      "id": "a0a8f3af-7efa-4d53-a1e3-2cd9be279ea6",
      "categoryId": "bbf0db7f-72d1-4c3f-871a-8e7afbf5f528",
      "name": "Thank You Card",
      "description": "Polished cards for expressing appreciation to customers, guests, or partners.",
      "specifications": {
        "size": {
          "base": "A6",
          "label": "Size",
          "options": ["A6", "A5"],
          "priceType": "PER_UNIT"
        },
        "finish": {
          "label": "Finish",
          "options": ["Matte", "Gloss"]
        },
        "printing": {
          "base": "Single sided",
          "label": "Printing",
          "options": ["Single sided", "Double sided"],
          "priceType": "PER_UNIT"
        },
        "orientation": {
          "label": "Orientation",
          "options": ["Landscape", "Portrait"]
        }
      },
      "addons": [],
      "createdAt": "2026-02-14T21:50:14.671Z",
      "updatedAt": "2026-02-14T21:50:14.671Z"
    }
  ],
  "success": true
}
```
