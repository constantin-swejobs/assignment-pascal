import React, { useContext, useState } from "react";
import { FunctionComponent } from "react";
import { Panel, PanelStack } from "../ui/panel-stack/PanelStack";
import { InventoryContext } from "../api/InventoryProvider";
import { Company, Product, Series } from "../api/inventory-store";

import "./product-selector-view.scss";

const ProductSelectorView: FunctionComponent = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company>();
  const [selectedSeries, setSelectedSeries] = useState<Series>();

  const inventoryContext = useContext(InventoryContext);

  const selectionIndex =
    selectedCompany != null && selectedSeries != null
      ? 2
      : selectedCompany != null
        ? 1
        : 0;

  const handleProductSelection = (product: Product) => {
    alert(`"${product.name}" selected`);
  };

  return (
    <div className="product-selector-view">
      <PanelStack title="Product Selection" selectedPanel={selectionIndex}>
        <Panel
          title="Company"
          subtitle={selectedCompany != null ? selectedCompany.name : "—"}
        >
          {inventoryContext.getCompanies().map((company, i) => (
            <button onClick={() => setSelectedCompany(company)} key={i}>
              <h5>{company.name}</h5>
            </button>
          ))}
        </Panel>
        <Panel
          title="Series"
          subtitle={selectedSeries ? selectedSeries.name : "—"}
        >
          {selectedCompany?.getSeries().map((series, i) => (
            <button onClick={() => setSelectedSeries(series)} key={i}>
              <h5>{series.name}</h5>
              <p>{selectedCompany.name}</p>
            </button>
          ))}
        </Panel>
        <Panel title="Products">
          {selectedSeries?.getProducts().map((product, i) => (
            <button onClick={() => handleProductSelection(product)} key={i}>
              <h5>{product.name}</h5>
              <p>
                {selectedCompany?.name}
                <span>/</span>
                {selectedSeries.name}
              </p>
            </button>
          ))}
        </Panel>
      </PanelStack>
    </div>
  );
};

export { ProductSelectorView };
