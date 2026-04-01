"use client";

import {
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  Heading,
  Button as AriaButton,
} from "react-aria-components";
import { cn } from "@/lib/cn";

export function Accordion({ items, className }) {
  return (
    <DisclosureGroup className={cn("space-y-2", className)}>
      {items.map((item) => (
        <Disclosure key={item.id} className="border-2 border-black dark:border-white">
          {({ isExpanded }) => (
            <>
              <Heading>
                <AriaButton className="flex w-full items-center justify-between px-4 py-3 text-left text-xs font-black uppercase tracking-widest transition-colors hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                  <span>{item.title}</span>
                  <span aria-hidden="true">{isExpanded ? "-" : "+"}</span>
                </AriaButton>
              </Heading>
              <DisclosurePanel className="border-t-2 border-black px-4 py-3 font-bold leading-loose dark:border-white">
                {item.content}
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ))}
    </DisclosureGroup>
  );
}
