import { LayoutDeviceType } from '../../../../../../common/types';
import { CommonStructureProps } from '../../../../common/types';

export type StructureMobileTabletProps = CommonStructureProps & {
	device: LayoutDeviceType;
};
