import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long." })
    .max(50, { message: "Title cannot exceed 50 characters." })
    .or(z.literal("")),
  jobDescription: z
    .string()
    .min(10, { message: "Job description must be at least 10 characters." })
    .max(10000, { message: "Job description cannot exceed 10000 characters." }),
  resume: z
    .string()
    .max(10000, { message: "Resume cannot exceed 10000 characters." })
    .default("None")
    .or(z.literal("None")),
  numQuestions: z
    .number()
    .min(3, { message: "Must be at least 3 questions." })
    .max(10, { message: "Cannot exceed 10 questions." })
    .default(3),
  isTechnical: z.boolean().default(false),
})

interface SubmitSpeechProps {
  setQuestions: React.Dispatch<React.SetStateAction<string[]>>
  setError: React.Dispatch<React.SetStateAction<boolean>>
  setProps: React.Dispatch<React.SetStateAction<any>>
}

export default function QuestionGenerator({
  setQuestions,
  setError,
  setProps,
}: SubmitSpeechProps) {
  const [generating, setGenerating] = useState(false)
  const [sliderValue, setSliderValue] = useState(3)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      jobDescription: "",
      resume: "",
      numQuestions: 3,
      isTechnical: false,
    },
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setGenerating(true)
    const formData = new FormData()

    formData.append("job_description", values.jobDescription)
    formData.append("numbQuestions", values.numQuestions.toString())
    formData.append("resume", values.resume ? values.resume : 'None')
    formData.append("isTechnical", values.isTechnical.toString())

    try {
      fetch("https://flara--flara-backend-fastapi-endpoint.modal.run/generate_questions/", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((res) => {
          if (res)
            res.json().then((data) => {
              console.log(data);
              data = JSON.parse(data)
              const arr = Object.values(data) as string[]
              setProps({
                title: values.title,
                isTechnical: values.isTechnical,
                jobDescription: values.jobDescription,
                resume: values.resume,
              })
              setQuestions(arr)
              setGenerating(false)
            })
        })
        .catch((error) => {
          console.error("Error submitting:", error)
          setGenerating(false)
          setError(true)
        })
    } catch (error) {
      console.error("Error submitting:", error)
      setGenerating(false)
      setError(true)
    }
  }


    if (generating) { return (
      <div className="overflow-y-hidden grow">
        <div className="flex justify-center items-center">
          <div className="mx-10 border rounded-3xl overflow-hidden">
            <div className="flex justify-center items-center pb-4">
              <svg
                aria-hidden="true"
                className="w-16 h-16 mt-10 text-gray-200 animate-spin fill-[#6cde12] flex justify-center items-center"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
            <p className="text-2xl text-gray-500 animate-pulse text-center px-5 md:px-10">
              Generating Questions...
            </p>
            <div className="text-center flex justify-center px-5 md:px-10">
              <p className="text-center max-w-80 text-[#22222290] mt-3">
                This may take up to 30 seconds.
              </p>
            </div>
            <div className="text-center flex justify-center">
              <p className="text-center max-w-[30rem] text-[#33333390] bg-neutral-50 mt-10 py-10 border-t px-5 md:px-10">
                <strong>TIP</strong>: Answer the questions in order and take your time, attempt to not redo any questions to simulate a realistic setting.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className="min-w-full absolute right-0 top-0 flex-1 flex justify-center items-center mt-4 md:mt-0 bg-white">
      <div className="md:mt-12 w-full mx-5 md:mx-12 border backdrop-blur-3xl rounded-3xl overflow-hidden mb-16 ">
        <div className="bg-neutral-100 text-xl md:text-3xl font-semibold p-4 border-b">
          Generate Interview
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => handleSubmit(data))}
            className="space-y-6 py-8"
          >
            <div className="grid grid-cols-1 gap-6">
              {/* Job Title & Number of Questions */}
              <div className="md:flex md:space-x-6 border-b px-6 pb-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="md:w-3/4 mb-8 md:mb-0">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input className="text-md" placeholder="Interview/Job Title" {...field} />
                      </FormControl>
                      <FormDescription>
                        This title will appear on the interview report.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numQuestions"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Number of Questions</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-4 translate-y-2">
                          <Slider
                            min={3}
                            max={10}
                            defaultValue={[3]}
                            onValueChange={(value) => {
                              field.onChange(value[0] as number)
                              setSliderValue(value[0] as number)
                            }}
                          />
                          <span>{sliderValue}</span>
                        </div>
                      </FormControl>
                      <FormDescription className="translate-y-3.5">
                        Select the number of questions you want to generate.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Job Description & Resume */}
              <div className="md:flex md:space-x-6 px-6">
                <FormField
                  control={form.control}
                  name="jobDescription"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2 mb-8 md:mb-0">
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe or paste a job description."
                          {...field}
                          className="min-h-[200px] text-md"
                        />
                      </FormControl>
                      <FormDescription>
                        This description will help generate questions tailored to
                        the specific job requirements.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="resume"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Resume</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe or paste your resume or experiences."
                          {...field}
                          className="min-h-[200px] text-md"
                        />
                      </FormControl>
                      <FormDescription>
                        Your resume will help generate personalized questions regarding your experience.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Is Technical & Submit Button */}
            <div className="md:flex gap-4 justify-between items-center px-6 mb-">
              <FormField
                control={form.control}
                name="isTechnical"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-4 mb-8 md:mb-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div>
                      <FormLabel>Technical Interview</FormLabel>
                      <FormDescription>
                        Includes job experience related questions, especially useful for software and tech jobs.
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-[#9aee59] hover:bg-[#6cde12] text-[#333333] rounded-xl">
                <p className="p-2">Generate Interview</p>
                </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
