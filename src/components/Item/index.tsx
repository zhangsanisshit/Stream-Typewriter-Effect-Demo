import React from 'react';

export const Item = (props: { containerClassName?: string, label: string; value: string | React.ReactNode, id?: string }) => {
  const { label, value, containerClassName, id } = props;
  return (
    <div className={`flex flex-row
      } ${containerClassName || 'items-start'}`}>
      <div className="flex items-center gap-1 mr-2 min-h-[32px]">
        <div className="w-[77px] text-sm font-medium text-charcoal-700" style={{ textAlignLast: 'justify' }}>{label}</div>
        <div className="text-sm font-medium text-charcoal-700">{':'}</div>
      </div>
      <div id={id ?? ''} className={`text-sm font-normal flex items-center text-charcoal-850 ${containerClassName?.includes('justify-between') ? '' : 'flex-1'}`}>{value}</div>
    </div>
  );
};