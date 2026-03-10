<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3b3179d8532040d7541f19a509a6714c3f120649
import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
    React.ElementRef<typeof SeparatorPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", ...props }, ref) => (
    <SeparatorPrimitive.Root
        ref={ref}
        decorative
        orientation={orientation}
        className={cn(
            "shrink-0 bg-border",
            orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
            className
        )}
        {...props}
    />
))
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
<<<<<<< HEAD
=======
=======
import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
    React.ElementRef<typeof SeparatorPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", ...props }, ref) => (
    <SeparatorPrimitive.Root
        ref={ref}
        decorative
        orientation={orientation}
        className={cn(
            "shrink-0 bg-border",
            orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
            className
        )}
        {...props}
    />
))
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
>>>>>>> 9137b811872796b8f1aed4f7ae2c5ce35dbbe851
>>>>>>> 3b3179d8532040d7541f19a509a6714c3f120649
