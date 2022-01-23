export enum REST_METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type School = {
  _id?: string;
  name: string;
  postcode: string;
};

export type Product = {
  _id?: string;
  name: string;
  description: { [x: string]: {} | undefined };
  image: string;
  price: number | null;
  etsyLink: string;
};

export type Trustee = {
  _id?: string;
  name: string;
  description: { [x: string]: {} | undefined };
};

export type Event = {
  _id?: string;
  slug?: string;
  title: string;
  image: string;
  description: { [x: string]: {} | undefined };
  eventbriteLink: string;
  date: {
    day: string;
    startTime: {
      time: string;
      period: "AM" | "PM";
    };
    endTime: {
      time: string;
      period: "AM" | "PM";
    };
  };
};
