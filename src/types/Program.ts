export interface TotalItems {
  total: number;
}

export interface Program {
  id: string; // UUID
  createdAt: Date;
  attributes: {
    slug?: string;
    name?: string;
    description?: string;
    numWeeks?: number;
    numClassesPerWeek?: number;
    durationMin?: number;
    isDraft?: boolean;
    durationMax?: number;
    active?: boolean;
    published?: boolean;
    hasSchedule?: boolean;
    totalClasses?: number;
    classesId?: string;
    boxId?: string;
  };
}

// Interface for relationships
export interface ProgramRelationships {
  box: {
    data: {
      type: 'box';
      id: string;
    };
  };
  classes: {
    data: {
      type: 'classes';
      id: string;
    };
  };
}

// Interface for JSON:API compliant program data
export interface ProgramData {
  type: 'program';
  id: string;
  attributes: Program;
  relationships: ProgramRelationships;
  links: Links;
}

// Interface for JSON:API links
export interface Links {
  self: string;
}

// Interface for meta information
export interface Meta {
  total: number;
}

// Interface for the JSON:API version object
export interface JSONAPI {
  version: string;
}

// Interface for the full response conforming to JSON:API
export interface ProgramsResponse {
  jsonapi: JSONAPI;
  meta: Meta;
  data: Program[];
  links: Links;
}

export interface ProgramDetailResponse {
  jsonapi: JSONAPI;
  meta: Meta;
  data: Program;
  links: Links;
}
