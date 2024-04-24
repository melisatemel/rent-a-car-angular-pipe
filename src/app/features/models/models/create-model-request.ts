export interface CreateModelRequest {
    brandId:    number;
    name:       string;
    modelYear:  number;
    imageUrl:   string;
    dailyPrice: number;
}

export interface Brand {
    id:   number;
    name: string;
}