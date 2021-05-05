import StylesForComponent from "./styles";

/**
 * SpinLoading component.
 * Component for render loading spin.
 */
export default function SpinLoading() {
  const styles = StylesForComponent();
  return <div className={styles.spinLoading}></div>;
}
