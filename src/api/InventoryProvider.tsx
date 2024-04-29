import React, {
  FunctionComponent,
  PropsWithChildren,
  createContext,
} from "react";
import { Company, Product, Series } from "./inventory-store";
import { RAW_DATA } from "./inventory-data";

const parseInventory = (): Array<Company> => {
  // Phase 1: Unflatten the raw inventory data

  const companies = new Map<string, Map<string, Array<Product>>>();
  for (let i = 0; i < RAW_DATA.length; i++) {
    const product: Product = {
      id: RAW_DATA[i].id,
      name: RAW_DATA[i].product,
      data: RAW_DATA[i].data,
    };

    const existingSeriesMapRef = companies.get(RAW_DATA[i].company);
    if (existingSeriesMapRef != null) {
      const existingProductListRef = existingSeriesMapRef.get(
        RAW_DATA[i].series,
      );
      if (existingProductListRef != null) {
        existingProductListRef.push(product);
      } else {
        existingSeriesMapRef.set(RAW_DATA[i].series, [product]);
      }
    } else {
      const seriesMap = new Map();
      seriesMap.set(RAW_DATA[i].series, [product]);
      companies.set(RAW_DATA[i].company, seriesMap);
    }
  }

  // Phase 2: build the immutable inventory tree representation

  const result: Array<Company> = [];
  for (const [companyName, seriesMap] of companies.entries()) {
    const series: Array<Series> = [];

    for (const [seriesName, products] of seriesMap.entries()) {
      series.push(new Series(seriesName, products));
    }

    result.push(new Company(companyName, series));
  }

  return result;
};

const INVENTORY_DATA = parseInventory();

interface IInventoryContext {
  getCompanies: (searchString?: string) => Array<Company>;
}

const InventoryContext = createContext<IInventoryContext>({
  getCompanies: () => [],
});

const InventoryProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const inventoryImplementation = {
    getCompanies: () => INVENTORY_DATA,
  };

  return (
    <InventoryContext.Provider value={inventoryImplementation}>
      {children}
    </InventoryContext.Provider>
  );
};

export { InventoryProvider, InventoryContext };
