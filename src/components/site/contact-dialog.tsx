"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Mail, MessageCircle, Phone, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const contacts = [
  { icon: MessageCircle, label: "WeChat", value: "unsiao" },
  { icon: Mail, label: "Mail", value: "info@aosa.me" },
  { icon: Phone, label: "Phone", value: "17638636162" },
];

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-card-strong px-4 py-3">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 shrink-0 text-muted" />
        <div>
          <p className="text-xs text-muted">{label}</p>
          <p className="font-mono text-sm font-medium text-foreground">{value}</p>
        </div>
      </div>
      <button
        onClick={copy}
        aria-label={`复制 ${label}`}
        className="flex cursor-pointer items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs text-muted transition-colors hover:bg-background hover:text-foreground"
      >
        {copied ? <Check className="h-3 w-3" /> : null}
        {copied ? "已复制" : "复制"}
      </button>
    </div>
  );
}

export function ContactDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[80] w-[min(92vw,400px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-line bg-background p-6 shadow-2xl shadow-black/20 focus:outline-none">
          <div className="flex items-start justify-between">
            <div>
              <Dialog.Title className="text-lg font-medium tracking-tight text-foreground">
                联系 UNSIAO.Ltd 获取授权
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted">
                输入授权码即可使用，授权状态实时校验。
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                aria-label="关闭"
                className="cursor-pointer rounded-full p-1 text-muted transition-colors hover:bg-card hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>
          <div className="mt-5 space-y-2">
            {contacts.map((c) => (
              <Row key={c.label} icon={c.icon} label={c.label} value={c.value} />
            ))}
          </div>
          <div className="mt-5 flex justify-end">
            <Button size="sm" onClick={() => setOpen(false)}>
              知道了
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
