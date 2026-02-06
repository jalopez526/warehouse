export type InboundStatus = 'PENDING' | 'SCHEDULED' | 'DELIVERED' | 'PROCESSING' | 'COMPLETED' | 'DELAYED' | 'CANCELLED';

export type OrderStatus = 'PENDING' | 'PICKING' | 'AUDITING' | 'AUDITED' | 'SHIPPING' | 'FULFILLED' | 'CANCELLED';

export interface InboundLoad {
    id: string;
    carrier: string;
    eta: string; // ISO Date string
    pallets: number;
    dock?: string;
    status: InboundStatus;
    createdAt: string;
    updatedAt: string;
}

export interface Order {
    id: string;
    status: OrderStatus;
    units: number;
    lineItems: number;
    assignedUser?: string;
    createdAt: string;
    updatedAt: string;
    // Frontend-only derived/mock properties (optional)
    dock?: string;
    carrier?: string;
    isHighPriority?: boolean;
    progress?: number;
    auditPassed?: boolean;
    atRisk?: boolean;
}
