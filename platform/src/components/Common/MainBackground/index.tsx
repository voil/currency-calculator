import StylesForComponent from "./styles";
import background from "./assets/background.jpg";

/**
 * MainBackground component.
 * Component for set main background application.
 */
export default function MainBackground() {
  const styles = StylesForComponent();
  return (
    <img className={styles.mainBackground} src={background} alt="background" />
  );
}
