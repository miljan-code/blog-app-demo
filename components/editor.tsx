'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import EditorJS, { type OutputData } from '@editorjs/editorjs';
import TextareaAutosize from 'react-textarea-autosize';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import type { Post } from '@/db/schema';
import '@/styles/editor.css';

interface EditorProps {
  post: Post;
}

export const Editor = ({ post }: EditorProps) => {
  const editorRef = useRef<EditorJS>();

  const [isMounted, setIsMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const initEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default;
    // @ts-ignore
    const Header = (await import('@editorjs/header')).default;
    // @ts-ignore
    const Embed = (await import('@editorjs/embed')).default;
    // @ts-ignore
    const Table = (await import('@editorjs/table')).default;
    // @ts-ignore
    const List = (await import('@editorjs/list')).default;
    // @ts-ignore
    const Code = (await import('@editorjs/code')).default;
    // @ts-ignore
    const LinkTool = (await import('@editorjs/link')).default;
    // @ts-ignore
    const InlineCode = (await import('@editorjs/inline-code')).default;

    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          editorRef.current = editor;
        },
        placeholder: 'Type here to write your post...',
        inlineToolbar: true,
        data: post.content as OutputData,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, [post]);

  useEffect(() => {
    if (typeof window !== undefined) {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      initEditor();

      return () => {
        editorRef.current?.destroy();
        editorRef.current = undefined;
      };
    }
  }, [isMounted, initEditor]);

  if (!isMounted) {
    return null;
  }

  const handlePatchPost = async () => {};

  return (
    <form onSubmit={handlePatchPost}>
      <div className="grid w-full gap-10">
        <div className="prose prose-stone mx-auto max-w-4xl dark:prose-invert">
          <TextareaAutosize
            autoFocus
            id="title"
            defaultValue={post.title}
            placeholder="Post title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />
          <div id="editor" className="min-h-[500px]" />
          <p className="text-sm text-gray-500">
            Use{' '}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{' '}
            to open the command menu.
          </p>
        </div>
        <div className="flex max-w-4xl mx-auto w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: 'ghost' }))}
            >
              <>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Back
              </>
            </Link>
          </div>
          <button type="submit" className={cn(buttonVariants())}>
            {isSaving && <Icons.loader className="mr-2 h-4 w-4 animate-spin" />}
            <span>Save</span>
          </button>
        </div>
      </div>
    </form>
  );
};
