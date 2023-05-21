import { LayoutDeviceType, LayoutProps } from '../../../../common/types';

export type CommonStructureProps = Pick<LayoutProps, 'children'>;

export type StructureProps = CommonStructureProps & {
	device: LayoutDeviceType;
};
