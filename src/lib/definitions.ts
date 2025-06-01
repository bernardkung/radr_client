// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type Auditor = {
  id: string;
  name: string;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type Facility = {
  id: string;
  global_id: string;
  dl_id: string;
  dl_name: string;
  mac: string;
  revenue_center: 'EAST' | 'WEST' | 'NORTH' | 'SOUTH' | null;
  npi: string;
  created_at: string;
  updated_at: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  // status: 'pending' | 'paid';
};

export type Patient = {
  mrn: string;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
};

export type Adr = {
  id: string;
  facility_id: string;
  mrn: string;
  from_date: string;
  to_date: string;
  expected_reimbursement: number;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type Stage = {
  id: string;
  adr_id: string;
  // In TypeScript, this is called a string union type.
  stage: '45' | '120' | '180' | 'ALJ' ;
  notification_date: string;
  due_date: string;
};


export type Submission = {
  id: string;
  stage_id: string;
  auditor_id: string;
  submission_date: string;
  created_at: string;
  updated_at: string;
};

export type Decision = {
  id: string;
  stage_id: string;
  auditor_id: string;
  decision_date: string;
  decision: string;
  created_at: string;
  updated_at: string;
};

export type DataTableFilterProps = {
  id: string;
  title: string;
  options: (string|number|boolean)[];
}




export type fullAdr = Adr & {
  patient: Patient;
  facility: Facility;
  stages: fullStage[];
};

export type fullStage = Stage & {
  submissions?: fullSubmission[] | Submission[];
  decisions?: Decision[];
}


export type fullSubmission = Submission & { 
  auditor?: Auditor;
};