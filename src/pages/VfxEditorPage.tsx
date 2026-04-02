import { ExternalLink, Sparkles } from 'lucide-react';
import { Box } from '@/components/ui/box';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HStack, Stack } from '@/components/ui/stack';
import { Heading, Text } from '@/components/ui/text';

const VfxEditorPage = () => {
  const editorUrl = `${import.meta.env.BASE_URL}vfx-editor/index.html`;
  const sequenceComposerUrl = `${import.meta.env.BASE_URL}vfx-editor/sequence-composer.html`;

  return (
    <Stack className="gap-6">
      <HStack className="items-start justify-between gap-4 flex-wrap">
        <Box>
          <HStack className="gap-2">
            <Sparkles className="size-5 text-primary" />
            <Heading>VFX Editor</Heading>
          </HStack>
          <Text muted className="mt-2 max-w-3xl leading-6">
            The old in-app editor has been removed. This page now hosts the standalone VFX tool,
            which links directly to the game repo when you need to browse, save, import sprites,
            or regenerate registries.
          </Text>
        </Box>

        <HStack className="gap-2 flex-wrap">
          <a
            href={sequenceComposerUrl}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: 'outline', size: 'sm' })}
          >
            Open Sequence Composer
            <ExternalLink className="size-3.5" />
          </a>
          <a
            href={editorUrl}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: 'default', size: 'sm' })}
          >
            Open Full Tool
            <ExternalLink className="size-3.5" />
          </a>
        </HStack>
      </HStack>

      <Card className="bg-card/80">
        <CardHeader className="pb-0">
          <CardTitle className="text-base">Embedded Standalone Tool</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Text muted size="sm" className="leading-6">
            Link the game repo root once inside the tool. If your browser blocks a file picker in
            the embedded view, use <strong>Open Full Tool</strong>.
          </Text>
          <Box className="overflow-hidden rounded-xl border border-border bg-black">
            <iframe
              title="Questing Together Standalone VFX Editor"
              src={editorUrl}
              className="block h-[calc(100vh-15rem)] min-h-[860px] w-full border-0"
            />
          </Box>
        </CardContent>
      </Card>

      <HStack className="gap-3 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(sequenceComposerUrl, '_blank', 'noopener,noreferrer')}
        >
          Launch Composer in New Tab
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(editorUrl, '_blank', 'noopener,noreferrer')}
        >
          Launch Editor in New Tab
        </Button>
      </HStack>
    </Stack>
  );
};

export default VfxEditorPage;
