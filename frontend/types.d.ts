export interface Product {
    id: number
    name: string
    price: number
    category: string
    description: string
    stock: number
  }
  
  export interface ProductsResponse {
    data: Product[]
    total: number
    page: number
    pageSize: number
  }