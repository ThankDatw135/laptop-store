// ============================================================
// Payment Types — Single Source of Truth
// ============================================================

export interface PaymentCreateResponse {
  payUrl?: string      // VNPay, MoMo
  orderUrl?: string    // ZaloPay
  deeplink?: string    // MoMo deeplink (mở app)
  qrCodeUrl?: string   // MoMo QR code
  zpTransToken?: string // ZaloPay transaction token
}

export interface VNPayIPNParams {
  vnp_TmnCode: string
  vnp_Amount: string
  vnp_BankCode: string
  vnp_BankTranNo: string
  vnp_CardType: string
  vnp_PayDate: string
  vnp_OrderInfo: string
  vnp_TransactionNo: string
  vnp_ResponseCode: string
  vnp_TransactionStatus: string
  vnp_TxnRef: string       // orderId
  vnp_SecureHashType: string
  vnp_SecureHash: string
}

export interface MoMoIPNBody {
  partnerCode: string
  orderId: string
  requestId: string
  amount: number
  orderInfo: string
  orderType: string
  transId: number
  resultCode: number      // 0 = success
  message: string
  payType: string
  responseTime: number
  extraData: string
  signature: string
  accessKey: string
}

export interface ZaloPayCallbackBody {
  data: string            // JSON string của payment data
  mac: string             // HMAC signature
  type: number
}
