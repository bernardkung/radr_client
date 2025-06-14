
  // const defaultValues = facilityFormSchema.parse(facility);
  const fakeDeniedStage: fullStage = {
    id: "fake45",
    adr_id: adr.id,
    stage: '45',
    due_date: "2024-02-14T00:00:00Z",
    notification_date: "2024-01-01T00:00:00Z",
    submissions: [
      {
        id: "fakeSubmission",
        stage_id: "fake120",
        auditor_id: "4444444",
        submission_date: "2024-02-14T00:00:00Z",
        created_at: "2024-02-14T00:00:00Z",
        updated_at: "2024-02-14T00:00:00Z",
        auditors: {
          id: "4444444",
          name: "Taylor Doe"
        }
      }
    ],
    decisions: [
      {
        id: "fakeDecision",
        stage_id: "fake120",
        auditor_id: "4444444",
        decision_date: "2024-02-15T00:00:00Z",
        decision: "DENIED",
        created_at: "2024-02-15T00:00:00Z",
        updated_at: "2024-02-15T00:00:00Z"
      }
    ],
  }

  const fakePaidStage: fullStage = {
    id: "fakePaid",
    adr_id: adr.id,
    stage: '45',
    due_date: "2024-02-14T00:00:00Z",
    notification_date: "2024-01-01T00:00:00Z",
    submissions: [
      {
        id: "fakeSubmission",
        stage_id: "fake120",
        auditor_id: "4444444",
        submission_date: "2024-02-14T00:00:00Z",
        created_at: "2024-02-14T00:00:00Z",
        updated_at: "2024-02-14T00:00:00Z",
        auditors: {
          id: "4444444",
          name: "Taylor Doe"
        }
      }
    ],
    decisions: [
      {
        id: "fakeDecision",
        stage_id: "fake120",
        auditor_id: "4444444",
        decision_date: "2024-02-15T00:00:00Z",
        decision: "PAID IN FULL",
        created_at: "2024-02-15T00:00:00Z",
        updated_at: "2024-02-15T00:00:00Z"
      }
    ],
  }

  const fakePendingStage: fullStage = {
    id: "fake120",
    adr_id: adr.id,
    stage: '120',
    due_date: "2024-03-14T00:00:00Z",
    notification_date: "2024-02-14T00:00:00Z",
    submissions: [
      {
        id: "fakeSubmission",
        stage_id: "fake120",
        auditor_id: "4444444",
        created_at: "2024-02-14T00:00:00Z",
        updated_at: "2024-02-14T00:00:00Z",
        auditors: {
          id: "4444444",
          name: "Taylor Doe"
        }
      }
    ]
  }

  
  const fakeWaitingStage: fullStage = {
    id: "fake180",  
    adr_id: adr.id,
    stage: '180',
    due_date: "2024-04-14T00:00:00Z",
    notification_date: "2024-03-14T00:00:00Z",
    submissions: [
      {
        id: "fakeSubmission",
        stage_id: "fake120",
        auditor_id: "4444444",
        submission_date: "2024-02-14T00:00:00Z",
        created_at: "2024-02-14T00:00:00Z",
        updated_at: "2024-02-14T00:00:00Z",
        auditors: {
          id: "4444444",
          name: "Taylor Doe"
        }
      }
    ]
  }