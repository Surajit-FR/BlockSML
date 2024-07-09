import { JwtPayload } from "jwt-decode";
import { ReactNode } from "react";

// Header type
export type CustomHeadersType = {
    headers: {
        Authorization: string
    }
}

// Form input type
export type formValuesType = {
    category_name?: string;
    categoryImage?: string;
    category_desc?: string;
    productTitle?: string;
    offer?: string;
    offerPercentage?: string;
    productImage?: string | null;
    productDescription?: string;
    price?: string;
    availability?: string;
    visibility?: string;
    categories?: string;
    web_theme?: string;
    couponNumber?: number;
    discount_amount?: number;
    expiry_date?: string;
};

// Form value props type
export type FormValues_Props = {
    data?: formValuesType | FormData | undefined;
    header?: CustomHeadersType | undefined;
    page?: number | undefined;
    pageSize?: number | undefined;
    searchQuery?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    navigate?: any;
    category_id?: string | undefined;
    product_id?: string | undefined;
    order_id?: string | undefined;
    selectedIDs?: Array<string>;
    isExpired?: string;
    params?: {
        page?: number;
        pageSize?: number;
        isExpired?: string;
        header?: CustomHeadersType;
    }
};

// Add category success resp type
type AddCategorySuccessResponse = {
    message: string;
    success: boolean;
};

// Update category success resp type
type UpdateCategorySuccessResponse = {
    message: string;
    success: boolean;
};

// Add Product success resp type
type AddProductSuccessResponse = {
    message: string;
    success: boolean;
};

// Update Product success resp type
type UpdateProductSuccessResponse = {
    message: string;
    success: boolean;
};

// Signin input type
export type signinInputValues = {
    credential?: string;
    password?: string;
    remember_me?: boolean;
};

// Form input Event type
export type SyntheticBaseEvent = {
    target: {
        value: string;
        name: string;
    };
};

// User auth props type
export type UserAuth_Props = {
    data: signinInputValues;
    navigate: any
};

// Define the type for a single permission
export type Permission = {
    name: string;
};

// Define the type for the role, which includes an array of permissions
export type Role = {
    name: string;
    permissions: Permission[];
};

// Define the type for the Address,
export type Address = {
    _id: string;
    user: string;
    address: string;
    apartment: string;
    country: string;
    state: string;
    city: string;
    postalCode: string;
    primary: boolean;
};

// PermissionCheckResult type
export type PermissionCheckResult = {
    [key: string]: boolean;
};

// UserData type
export type UserData = {
    _id: string;
    full_name: string;
    email: string;
    password: string;
    role: Role;
    address: Address;
    is_active: boolean;
    is_delete: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    web_theme: string;
    remember_me: boolean;
};

// CustomerListType
export type CustomerListType = {
    _id: string;
    full_name: string;
    email: string;
    password: string;
    web_theme: string;
    role: Role;
    address: Array<Address>;
    is_active: boolean;
    is_delete: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type CustomerType = {
    email: string;
    full_name: string;
    phone: string;
    address: string;
    apartment?: string;
    country: string;
    state: string;
    city: string;
    postalCode: string;
}

export type ProductType = {
    _id: string;
    productTitle: string;
    productImages: string[];
    price: string;
}

export type ItemType = {
    cart: string;
    product: ProductType;
    quantity: number;
    _id: string;
}

export type ShippingType = {
    type: 'free' | 'cod';
    cost: number;
}

// ProductOrderListType
export type ProductOrderListType = {
    _id: string;
    user: string;
    orderId: string;
    items: Array<ItemType>,
    payment: string;
    status: string;
    subtotal: number;
    discount: number;
    total: number;
    shipping: ShippingType;
    createdAt: string;
    updatedAt: string;
    customer: CustomerType;
    __v: number;
};

// Define the type for the login success response
type LoginSuccessResponse = {
    data: UserData;
    message: string;
    success: boolean;
    token: string;
};

// CustomAlertProps
export type CustomAlertProps = {
    type: 'success' | 'danger' | 'warning' | 'info' | 'dark';
    message: string;
    onClose: () => void;
}

// User drop down links type
export type dropdownItemsType = {
    icon: string;
    text: string;
    link: string;
};

// Define the pagination type
export type Pagination_Type = {
    pageCount: number;
    pageNumber: number;
    changePage: (data: { selected: number }) => void;
};

// Category list type
export type CategoryListType = {
    _id: string;
    categoryID: string;
    category_name: string;
    categoryImage: string;
    category_desc: string;
    is_delete: boolean,
    createdAt: string;
    updatedAt: string;
    __v: string;
};

// Coupon list type
export type CouponListType = {
    _id: string;
    discount_coupon: string;
    discount_amount: number;
    is_expired: boolean;
    expiry_date: string;
};

// Promise return type FetchAllCategoryResponse
export type FetchAllCategoryResponse = {
    data: [CategoryListType];
    message: string;
    success: boolean;
};

// Product list type
type ProductListType = {
    _id: string;
    productTitle: string;
    offer: string;
    offerPercentage: string;
    productImages: Array<string>;
    productDescription: string;
    price: string;
    availability: string;
    visibility: string;
    categories: Array<CategoryListType>;
    is_delete: boolean,
    createdAt: string;
    updatedAt: string;
    __v: string;
};

// Promise return type FetchAllProductResponse
export type FetchAllProductResponse = {
    data: [ProductListType];
    message: string;
    success: boolean;
};

// Search_props_type
export type Search_props_type = {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// Common response type
export interface ApiResponse<T> {
    productImages: Array<string>;
    categoryImage: string;
    productTitle: ReactNode;
    price(price: any): unknown;
    category_name: ReactNode;
    _id: string;
    token(token: any): string;
    message: string;
    success: boolean;
    data: T;
}

// CustomJwtPayload type
export interface CustomJwtPayload extends JwtPayload {
    _id?: string;
    full_name?: string;
    email?: string;
    password?: string;
    web_theme?: string;
    role?: Role;
    is_active?: boolean;
    is_delete?: boolean;
    remember_me?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

// Common response type for category operations
export type CategoryResponse = ApiResponse<Array<CategoryListType>>;

// Common response type for product operations
export type ProductResponse = ApiResponse<Array<ProductListType>>;

// Common response type for authentication
export type AuthResponse = ApiResponse<LoginSuccessResponse['data']>;

// Common response type for adding or updating categories
export type CategoryOperationResponse = ApiResponse<AddCategorySuccessResponse | UpdateCategorySuccessResponse>;

// Common response type for adding or updating products
export type ProductOperationResponse = ApiResponse<AddProductSuccessResponse | UpdateProductSuccessResponse>;