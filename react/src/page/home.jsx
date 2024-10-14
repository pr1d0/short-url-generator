import { useToast } from "@/hooks/use-toast"
import { CheckIcon } from "lucide-react";
import { joiResolver } from '@hookform/resolvers/joi';
import './waves.css'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import UrlApi from "@/api/urlApi";
import urlValidations from '../../../src/validations/url.validation';
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ToastAction } from "@/components/ui/toast";

function HomePage() {
    const { toast } = useToast();
    const [urls, setUrls] = useState([])
    const form = useForm({
        resolver: joiResolver(urlValidations.createUrl.body),
        defaultValues: {
            origin: "",
        },
    })

    const onSubmit = async ({ origin }) => {
        const shortUrl = await UrlApi.generateUrl(origin);

        setUrls([...urls, ...[shortUrl]])

        toast({
            title: 'Short url redy!',
            description: `You can use /${shortUrl.shortId} link to access ${shortUrl.origin} url`,
            type: 'success',
            duration: 5000,
            icon: <CheckIcon size={24} color="green" />,
            action: <ToastAction altText="Copy Short Url" onClick={()=> {navigator.clipboard.writeText(`localhost:3200/` + shortUrl.shortId)}}>Copy Short Url</ToastAction>,

        })
    }

    return (
        <>
            <header className="header">
                <h1 className="header__title">Short Url Generator</h1>
            </header>

            <main className="main">
                <div className="content">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="generator-form w-2/3 space-y-4">
                            <FormField
                                control={form.control}
                                name="origin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Enter your URL" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Generate</Button>
                        </form>
                    </Form>
                    <div className="urls">
                        {urls.map(url =>
                            <TooltipProvider key={url.shortId}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" onClick={()=> window.open(`//localhost:3200/` + url.shortId, '_blank')}>/{url.shortId}</Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{url.origin}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                </div>
            </main>

            <div className="waves-container">
                <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g className="parallax">
                        <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                        <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                        <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                        <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                    </g>
                </svg>
            </div>
        </>
    )
}

export default HomePage