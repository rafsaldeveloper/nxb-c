"use client"

import EnquiryAttachments from "@/components/enquiry-attachments"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function AttachmentsGrid({ images, onClose }) {
    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-h-[90vh] w-[calc(100%-1.5rem)] max-w-4xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Attachments</DialogTitle>
                    <DialogDescription>Preview images or download the attached files.</DialogDescription>
                </DialogHeader>
                <EnquiryAttachments attachments={images} />
            </DialogContent>
        </Dialog>
    )
}
