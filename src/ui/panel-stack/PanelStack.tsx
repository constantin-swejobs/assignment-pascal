import React, { FunctionComponent, ReactElement, ReactNode } from "react";

interface IPanelProps {
  title: string;
  subtitle?: string;

  children: ReactNode;
}

const Panel: FunctionComponent<IPanelProps> = () => {
  return null;
};

interface IPanelStackProps {
  title: string;

  selectedPanel: number;
  onSelectedPanelChange?: (newVal: number) => void;

  children: Array<ReactElement<IPanelProps>>;
}

const PanelStack: FunctionComponent<IPanelStackProps> = ({
  title,
  selectedPanel,
  onSelectedPanelChange,
  children,
}) => {
  const panelStackHeader = children.map(
    (elem: ReactElement<IPanelProps>, i) => {
      return (
        <div
          className={`panel-stack-header ${selectedPanel === i ? "active" : ""} ${selectedPanel > i ? "completed" : ""}`}
          key={i}
        >
          <span className="panel-stack-header-index">{i + 1}.</span>
          <div className="panel-stack-header-inner">
            <h3>{elem.props.title}</h3>
            <h4>{elem.props.subtitle}</h4>
          </div>
        </div>
      );
    },
  );

  const panelStackContent = children.map(
    (elem: ReactElement<IPanelProps>, i) => {
      return (
        <div
          className={`panel-stack-content ${selectedPanel === i ? "active" : ""} ${selectedPanel > i ? "completed" : ""}`}
          key={i}
        >
          {elem.props.children}
        </div>
      );
    },
  );

  return (
    <div className="panel-stack">
      <header>
        <h1>{title}</h1>
        {panelStackHeader}
      </header>
      <main>{panelStackContent}</main>
    </div>
  );
};

export { Panel, PanelStack };
export type { IPanelProps, IPanelStackProps };
