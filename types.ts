
export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  accessLevel: number;
  imageUrl: string;
}

export enum VerificationStatus {
  IDLE = 'IDLE',
  CAMERA_ACTIVE = 'CAMERA_ACTIVE',
  VERIFYING = 'VERIFYING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}
