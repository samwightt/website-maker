import { Dynamic } from "solid-js/web";
import { Match, Switch, For } from "solid-js";

export interface TagType {
  type: "tag";
  tag: "h1" | "p" | "div";
  children: ElementType[];
}

export interface TextType {
  type: "text";
  text: string;
}

export type ElementType = TagType | TextType;

export const Element = (props: { element: ElementType }) => {
  return (
    <Switch>
      <Match when={props.element.type === "tag"}>
        <Dynamic component={(props.element as TagType).tag}>
          <For each={(props.element as TagType).children}>
            {(child) => <Element element={child} />}
          </For>
        </Dynamic>
      </Match>
      <Match when={props.element.type === "text"}>
        {(props.element as TextType).text}
      </Match>
    </Switch>
  );
};
