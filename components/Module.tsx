import ChartParent from '@/components/charts/ChartParent';

function Modules({ config }: any) {
  const { type } = config;
  return (
    <div>{type === 'd3_bar_chart' && <ChartParent config={config} />}</div>
  );
}

export default Modules;
