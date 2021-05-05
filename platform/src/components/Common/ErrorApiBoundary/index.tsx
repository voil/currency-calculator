import { useStoreSelector } from "../../../hooks";

/**
 * Type for component.
 */
type ErrorApiBoundryProps = {
  children?: JSX.Element | JSX.Element[];
  fallbackComponent: JSX.Element;
};

/**
 * ErrorApiBoundary component.
 * Component for set error boundry for api.
 */
export default function ErrorApiBoundary({
  children,
  fallbackComponent,
}: ErrorApiBoundryProps) {
  const apiState = useStoreSelector((state) => state.global);

  return <>{apiState.isApiDisbaled ? fallbackComponent : children}</>;
}
