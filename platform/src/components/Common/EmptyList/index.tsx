import StylesForComponent from "./styles";

/**
 * EmptyList component.
 * Component for show empty list description.
 */
export default function EmptyList() {
  const styles = StylesForComponent();
  return <div className={styles.emptyList}>- Empty list -</div>;
}
