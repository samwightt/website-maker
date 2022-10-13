import { createStore } from "solid-js/store";
import { Component, For } from "solid-js";
import { Element, ElementType } from "./Element";

const [rootStore, setRootStore] = createStore({
  elements: [] as Array<ElementType>,
});

(window as any).setPageContent = (elements: ElementType[]) => {
  setRootStore("elements", elements);
};

const App: Component = () => {
  return (
    <For each={rootStore.elements}>
      {(element) => <Element element={element} />}
    </For>
  );
};

export default App;
