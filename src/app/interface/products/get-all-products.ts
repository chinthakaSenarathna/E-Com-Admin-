export interface GetAllProducts {
    status: number;
    message: string;
    object: {
        count: number;
        dataList: Array<{
        propertyId: string;
        qty: number;
        unitPrice: number;
        description: string;
        productImages: string[];
        available: boolean;
    }>;
  };
}
