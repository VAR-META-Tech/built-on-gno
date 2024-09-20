import { type ForwardRefExoticComponent, type RefAttributes, type SVGProps } from 'react';

import gnoLight from './svgs/gno-light.logo.svg';
import gno from './svgs/gno.logo.svg';

const IconList = {
    gnoLight,
    gno,
};

type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ComponentAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;
interface IconProps extends ComponentAttributes {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
}

export type Icon = ForwardRefExoticComponent<IconProps>;

export const Icons = IconList as Record<keyof typeof IconList, Icon>;
