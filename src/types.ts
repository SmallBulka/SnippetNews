// types.ts
export interface IData_TagItem {
    value: string;
    count: number;
  }
  
  export interface IData_TrafficItem {
    value: string;
    count: number;
  }
  
  export interface IData_SnippetNews {
    ID: number;
    IT: string;
    AB: string;
    URL: string;
    DOM: string;
    DP: string;
    LANG: string;
    REACH: number;
    KM: IData_TagItem[];
    AU: string[];
    CNTR: string;
    CNTR_CODE: string;
    SENT: string;
    TRAFFIC: IData_TrafficItem[];
    FAV: string;
    HIGHLIGHTS: string[];
  }