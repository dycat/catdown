type DisplayProps = {
  text: string;
};

export function Display({ text }: DisplayProps): JSX.Element {
  return (
    <div
      className="w-1/2 h-full m-4 p-4"
      dangerouslySetInnerHTML={{ __html: text }}
    ></div>
  );
}
