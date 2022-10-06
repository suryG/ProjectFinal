

export interface segments {
    departure: departure;
    arrival: arrival;
    carrierCode:string;
    number:any;
}
export interface itineraries {
    segments: segments[];
    duration: string;
   
}
    // constructor(segments: segments[], duration: Date) {
    //     this.segments = segments;
    //     this.duration = duration;
    // }
    // minutes: any;
    // hours: any;
    // calculateFlightTime(timeStart: Date, duration: Date) {
    //     this.hours = String(timeStart.getHours()) + String(duration.getHours());
    //     this.minutes = String(timeStart.getMinutes()) + String(duration.getMinutes());
    //     if (Number(this.minutes) >= 60) {
    //         this.hours = this.hours + 1;
    //         this.minutes = this.minutes - 60;
    //     }
    //     if (this.minutes < 10) {
    //         this.minutes = "0" + this.minutes;
    //     }
    //     if (this.hours < 10) {
    //         this.hours = "0" + this.hours;
    //     }
    //     return this.hours + ":" + this.minutes;
    // }

export interface flightApi {
    result: flightApi[];
    data: any[];
    itineraries: itineraries[];
    id: string;
    lastTicketingDate: string;
    price: Price;
    oneWay:Boolean;
    numberOfStops: string;
}

export interface Price {
    base:Float32Array;
    currency:string;
}
export interface departure {
    at: Date;
    iataCode: string;//קוד ארץ מוצא
}
export interface arrival {
    at: Date;
    iataCode: string;//קוד ארץ מוצא
    numberOfStops: string;
}
