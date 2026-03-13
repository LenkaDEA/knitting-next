import Text from '@/components/Text';
import HookIcon from '@/components/icons/HookIcon';
import NeedlesIcon from '@/components/icons/NeedlesIcon';

const TOOL_ICONS: Record<string, React.ReactNode> = {
  hook: <HookIcon color="accent" width={48} height={48} />,
  needles: <NeedlesIcon color="accent" width={48} height={48} />,
};

const ToolDisplay: React.FC<{ tool: string }> = ({ tool }) => {
  return (
    TOOL_ICONS[tool] || (
      <Text color="accent" weight="bold" view="p-xl">
        {tool}
      </Text>
    )
  );
};
export default ToolDisplay;
