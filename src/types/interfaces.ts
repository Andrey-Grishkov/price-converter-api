export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    price_rub?: number | null;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export interface IProductsData {
    products: IProduct[];
}

export interface IRateData {
    ValCurs: {
        $: {
            Date: string;
            name: string;
        };
        Valute: {
            $: {
                ID: string;
            };
            NumCode: string;
            CharCode: string;
            Nominal: string;
            Name: string;
            Value: string;
            VunitRate: string;
        }[];
    };
}

export interface IDataId {
    Valuta: {
        $: {
            name: string;
        };
        Item: {
            $: { ID: string; };
            Name: string;
            EngName: string;
            Nominal: string;
            ParentCode: string;
        }[];
    };
}

export interface IArrayHandler {
    productsData: IProductsData;
    findDollarId: (data: IDataId) => string | undefined;
    findDollarRate: (data: IRateData, id: string) => string | undefined;
    setPrice: (rate: string) => IProductsData;
}

// IDataId
// {"Valuta":{"$":{"name":"Foreign Currency Market Lib"},"Item":[{"$":{"ID":"R01010"},"Name":"������������� " +
//         "������","EngName":"Australian Dollar","Nominal":"1","ParentCode":"R01010    "},{"$":{"ID":"R01015"},"Name":
//         "����������� �������","EngName":"Austrian Shilling","Nominal":"1000","ParentCode":"R01015    "},{"$":
//         {"ID":"R01020A"},"Name":"��������������� �����","EngName":"Azerbaijan Manat","Nominal":"1",
//     "ParentCode":"R01020    "},{"$":{"ID":"R01035"},"Name":"���� ���������� ������������ " +
//         "�����������","EngName":"British Pound Sterling","Nominal":"1","ParentCode":"R01035    "},
//     {"$":{"ID":"R01040F"},"Name":"���������� ����� ������","EngName":"Angolan new Kwanza","Nominal"
//             :"100000","ParentCode":"R01040    "},{"$":{"ID":"R01060"},"Name":"��������� ����","EngName":
//             "Armenia Dram","Nominal":"1000","ParentCode":"R01060    "},{"$":{"ID":"R01090B"},"Name":"����������� " +
//             "�����","EngName":"Belarussian Ruble","Nominal":"1","ParentCode":"R01090    "},{"$":{"ID":"R01095"},"Name"
//             :"����������� �����","EngName":"Belgium Franc","Nominal":"1000","ParentCode":"R01095    "},{"$":
//             {"ID":"R01100"},

// IRateData
// {
//     "ValCurs": {
//     "$": {
//         "Date": "03.02.2024",
//             "name": "Foreign Currency Market"
//     },
//     "Valute": [
//         {
//             "$": {
//                 "ID": "R01010"
//             },
//             "NumCode": "036",
//             "CharCode": "AUD",
//             "Nominal": "1",
//             "Name": "������������� ������",
//             "Value": "59,8101",
//             "VunitRate": "59,8101"
//         },
//         {
//             "$": {
//                 "ID": "R01020A"
//             },
//             "NumCode": "944",
//             "CharCode": "AZN",
//             "Nominal": "1",
//             "Name": "��������������� �����",
//             "Value": "53,3309",
//             "VunitRate": "53,3309"
//         },
//         {
//             "$": {
//                 "ID": "R01035"
//             },
//             "NumCode": "826",
//             "CharCode": "GBP",
//             "Nominal": "1",
//             "Name": "���� ���������� ������������ �����������",
//             "Value": "114,9783",
//             "VunitRate": "114,9783"
//         },
//         {
//             "$": {
//                 "ID": "R01060"
//             },
//             "NumCode": "051",
//             "CharCode": "AMD",
//             "Nominal": "100",
//             "Name": "��������� ������",
//             "Value": "22,4412",
//             "VunitRate": "0,224412"
//         },
//         {
//             "$": {
//                 "ID": "R01090B"
//             },
//             "NumCode": "933",
//             "CharCode": "BYN",
//             "Nominal": "1",
//             "Name": "����������� �����",
//             "Value": "28,2324",
//             "VunitRate": "28,2324"
//         },
