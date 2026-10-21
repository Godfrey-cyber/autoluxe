export type ListingType = "sale" | "lease";

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number; // sale price, or monthly price for lease
  listingType: ListingType;
  mileage: number;
  fuel: "Petrol" | "Diesel" | "Hybrid" | "Electric";
  transmission: "Automatic" | "Manual";
  body: "Sedan" | "SUV" | "Coupe" | "Convertible" | "Hatchback";
  color: string;
  location: string;
  image: string;
  specs: { engine: string; power: string; torque: string; acceleration: string; topSpeed: string; drivetrain: string; seats: number };
  description: string;
  sellerId?: string;
}

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

export const FALLBACK_IMAGE = u("photo-1494976388531-d1058494cdd8");

export const BRANDS = ["Porsche", "BMW", "Mercedes-Benz", "Audi", "Tesla", "Ford", "Chevrolet", "Ferrari", "Land Rover", "Toyota"];

export const VEHICLES: Vehicle[] = [
  { id: "porsche-911-carrera", brand: "Porsche", model: "911 Carrera S", year: 2023, price: 138000, listingType: "sale", mileage: 4200, fuel: "Petrol", transmission: "Automatic", body: "Coupe", color: "Guards Red", location: "Nairobi", image: u("photo-1503376780353-7e6692767b70"),
    specs: { engine: "3.0L twin-turbo flat-6", power: "443 hp", torque: "530 Nm", acceleration: "3.5 s", topSpeed: "308 km/h", drivetrain: "RWD", seats: 4 },
    description: "A single-owner 911 Carrera S with Sport Chrono, full service history and ceramic coating." },
  { id: "bmw-m4-competition", brand: "BMW", model: "M4 Competition", year: 2022, price: 1850, listingType: "lease", mileage: 12000, fuel: "Petrol", transmission: "Automatic", body: "Coupe", color: "Isle of Man Green", location: "Mombasa", image: u("photo-1555215695-3004980ad54e"),
    specs: { engine: "3.0L twin-turbo I6", power: "503 hp", torque: "650 Nm", acceleration: "3.9 s", topSpeed: "290 km/h", drivetrain: "RWD", seats: 4 },
    description: "Flexible 36-month lease including maintenance package and M Driver's Package." },
  { id: "mercedes-amg-gt", brand: "Mercedes-Benz", model: "AMG GT", year: 2021, price: 112000, listingType: "sale", mileage: 18500, fuel: "Petrol", transmission: "Automatic", body: "Coupe", color: "Obsidian Black", location: "Nairobi", image: u("photo-1618843479313-40f8afb4b4d8"),
    specs: { engine: "4.0L twin-turbo V8", power: "523 hp", torque: "670 Nm", acceleration: "3.7 s", topSpeed: "310 km/h", drivetrain: "RWD", seats: 2 },
    description: "Hand-built V8 with AMG Performance exhaust, Burmester audio and nappa leather." },
  { id: "audi-rs7", brand: "Audi", model: "RS 7 Sportback", year: 2022, price: 1650, listingType: "lease", mileage: 9800, fuel: "Petrol", transmission: "Automatic", body: "Sedan", color: "Nardo Grey", location: "Kisumu", image: u("photo-1606664515524-ed2f786a0bd6"),
    specs: { engine: "4.0L twin-turbo V8", power: "591 hp", torque: "800 Nm", acceleration: "3.6 s", topSpeed: "305 km/h", drivetrain: "AWD", seats: 5 },
    description: "Practical super-saloon with quattro AWD, dynamic ride control and panoramic roof." },
  { id: "tesla-model-s", brand: "Tesla", model: "Model S Plaid", year: 2023, price: 94000, listingType: "sale", mileage: 6100, fuel: "Electric", transmission: "Automatic", body: "Sedan", color: "Pearl White", location: "Nairobi", image: u("photo-1560958089-b8a1929cea89"),
    specs: { engine: "Tri-motor electric", power: "1,020 hp", torque: "1,420 Nm", acceleration: "2.1 s", topSpeed: "322 km/h", drivetrain: "AWD", seats: 5 },
    description: "600 km range, yoke steering, full self-driving capability transferred." },
  { id: "ford-mustang-gt", brand: "Ford", model: "Mustang GT", year: 2021, price: 48000, listingType: "sale", mileage: 22000, fuel: "Petrol", transmission: "Manual", body: "Coupe", color: "Race Red", location: "Nakuru", image: u("photo-1494976388531-d1058494cdd8"),
    specs: { engine: "5.0L Coyote V8", power: "450 hp", torque: "556 Nm", acceleration: "4.3 s", topSpeed: "250 km/h", drivetrain: "RWD", seats: 4 },
    description: "Six-speed manual V8 with performance pack and active valve exhaust." },
  { id: "chevrolet-corvette", brand: "Chevrolet", model: "Corvette Stingray", year: 2022, price: 1400, listingType: "lease", mileage: 8000, fuel: "Petrol", transmission: "Automatic", body: "Coupe", color: "Torch Red", location: "Nairobi", image: u("photo-1552519507-da3b142c6e3d"),
    specs: { engine: "6.2L V8", power: "495 hp", torque: "637 Nm", acceleration: "2.9 s", topSpeed: "312 km/h", drivetrain: "RWD", seats: 2 },
    description: "Mid-engine Corvette with Z51 package. Lease includes insurance." },
  { id: "ferrari-f8", brand: "Ferrari", model: "F8 Tributo", year: 2021, price: 289000, listingType: "sale", mileage: 5400, fuel: "Petrol", transmission: "Automatic", body: "Coupe", color: "Rosso Corsa", location: "Nairobi", image: u("photo-1583121274602-3e2820c69888"),
    specs: { engine: "3.9L twin-turbo V8", power: "710 hp", torque: "770 Nm", acceleration: "2.9 s", topSpeed: "340 km/h", drivetrain: "RWD", seats: 2 },
    description: "Collector-grade F8 Tributo with carbon racing seats and lift system." },
  { id: "range-rover-sport", brand: "Land Rover", model: "Range Rover Sport", year: 2023, price: 2100, listingType: "lease", mileage: 3000, fuel: "Hybrid", transmission: "Automatic", body: "SUV", color: "Santorini Black", location: "Nairobi", image: u("photo-1549399542-7e3f8b79c341"),
    specs: { engine: "3.0L I6 PHEV", power: "434 hp", torque: "620 Nm", acceleration: "5.4 s", topSpeed: "225 km/h", drivetrain: "AWD", seats: 5 },
    description: "Plug-in hybrid with 110 km electric range and air suspension." },
  { id: "toyota-land-cruiser", brand: "Toyota", model: "Land Cruiser 300", year: 2022, price: 98000, listingType: "sale", mileage: 25000, fuel: "Diesel", transmission: "Automatic", body: "SUV", color: "Precious White", location: "Eldoret", image: u("photo-1621007947382-bb3c3994e3fb"),
    specs: { engine: "3.3L twin-turbo V6 diesel", power: "305 hp", torque: "700 Nm", acceleration: "6.7 s", topSpeed: "210 km/h", drivetrain: "4WD", seats: 7 },
    description: "Go-anywhere luxury with multi-terrain select and seven seats." },
  { id: "bmw-x5", brand: "BMW", model: "X5 xDrive45e", year: 2021, price: 64000, listingType: "sale", mileage: 31000, fuel: "Hybrid", transmission: "Automatic", body: "SUV", color: "Carbon Black", location: "Nairobi", image: u("photo-1580273916550-e323be2ae537"),
    specs: { engine: "3.0L I6 PHEV", power: "389 hp", torque: "600 Nm", acceleration: "5.6 s", topSpeed: "235 km/h", drivetrain: "AWD", seats: 5 },
    description: "Efficient family SUV with M Sport package and Harman Kardon audio." },
  { id: "porsche-taycan", brand: "Porsche", model: "Taycan 4S", year: 2022, price: 1950, listingType: "lease", mileage: 11000, fuel: "Electric", transmission: "Automatic", body: "Sedan", color: "Frozen Blue", location: "Nairobi", image: u("photo-1614162692292-7ac56d7f7f1e"),
    specs: { engine: "Dual-motor electric", power: "562 hp", torque: "650 Nm", acceleration: "4.0 s", topSpeed: "250 km/h", drivetrain: "AWD", seats: 4 },
    description: "Performance Battery Plus with 800-volt fast charging." },
];

export const formatPrice = (v: Pick<Vehicle, "price" | "listingType">) =>
  `$${v.price.toLocaleString()}${v.listingType === "lease" ? "/mo" : ""}`;

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
