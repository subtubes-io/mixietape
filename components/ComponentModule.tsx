type ComponentWrapperProps = {
  children: React.ReactNode;
  title?: string | undefined;
};

export const ComponentModule: React.FC<ComponentWrapperProps> = ({
  children,
  title,
}) => {
  return (
    <div className="relative sm:col-span-2 xl:col-span-9 py-9">
      <div className="relative h-full w-full rounded-xl bg-white shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:bg-zinc-900 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:before:pointer-events-none dark:before:absolute dark:before:-inset-px dark:before:rounded-xl dark:before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
        <div className="grid h-full w-full justify-items-center overflow-hidden place-items-start justify-items-center p-6 py-8 sm:p-8 lg:p-12">
          <div className="w-full min-w-0">
            <h3 className="text-lg/7 font-semibold tracking-[-0.015em] text-zinc-950 sm:text-base/7 dark:text-white">
              {title}
            </h3>
            <div className="flow-root">
              <div className="mt-6 [--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)] lg:[--gutter:theme(spacing.12)] -mx-[--gutter] overflow-x-auto whitespace-nowrap">
                <div className="inline-block min-w-full align-middle sm:px-[--gutter]">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
