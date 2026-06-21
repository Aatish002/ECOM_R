import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const Contactform = () => {
  const contactSchema = z.object({
    firstName: z
      .string()
      .min(2, "First name is too short")
      .max(20, "First name is too long")
      .nonempty("First name is required"),

    lastName: z
      .string()
      .min(2, "Last name is too short")
      .max(20, "Last name is too long")
      .nonempty("Last name is required"),

    phoneNumber: z.string().nonempty("Phone number is required"),

    email: z.string().email("Invalid email").nonempty("Email is required"),

    contactMessage: z
      .string()
      .min(10, "Message is too short")
      .max(120, "Message is too long")
      .nonempty("Message is required"),
  });

  const form = useForm({
    resolver: zodResolver(contactSchema),
  });

  const { errors } = form.formState;

  const handleSubmit = (data) => {
    console.log(data);
    form.reset();
  };

  return (
    <form
      className="bg-black py-10 px-4 sm:px-6 lg:px-8"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <h1 className="text-yellow-500 text-3xl sm:text-4xl md:text-5xl flex justify-center font-[cursive] text-center">
        CONTACT US
      </h1>

      <div className="flex font-serif flex-col items-center mt-10 w-full max-w-5xl mx-auto text-base sm:text-lg">
        <div className="flex flex-col md:flex-row justify-between w-full gap-5 mb-5">
          <div className="flex flex-col w-full">
            <label className="text-yellow-500 mb-2">First Name:</label>

            <input
              {...form.register("firstName")}
              className="bg-white p-3 rounded-[7px] w-full outline-none"
              type="text"
              placeholder="First Name"
            />

            {errors.firstName && (
              <p className="mt-2 text-red-500 ">{errors.firstName.message}</p>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label className="text-yellow-500 mb-2">Last Name:</label>

            <input
              {...form.register("lastName")}
              className="bg-white p-3 rounded-[7px] w-full outline-none"
              type="text"
              placeholder="Last Name"
            />

            {errors.lastName && (
              <p className="mt-2 text-red-500 ">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="w-full mb-5">
          <label className="text-yellow-500 mb-2 block">Email Address:</label>

          <input
            {...form.register("email")}
            className="bg-white w-full p-3 rounded-[7px] outline-none"
            type="email"
            placeholder="Email Address"
          />

          {errors.email && (
            <p className="mt-2 text-red-500 ">{errors.email.message}</p>
          )}
        </div>

        <div className="w-full mb-5">
          <label className="text-yellow-500 mb-2 block">Phone Number:</label>

          <input
            {...form.register("phoneNumber")}
            className="bg-white w-full p-3 rounded-[7px] outline-none"
            type="text"
            placeholder="Phone Number"
          />

          {errors.phoneNumber && (
            <p className="mt-2 text-red-500 ">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div className="w-full">
          <label className="text-yellow-500 mb-2 block">
            Reason For Contact:
          </label>

          <textarea
            {...form.register("contactMessage")}
            className="bg-white w-full p-5 rounded-[7px] outline-none min-h-[150px]"
            placeholder="Reason For Contact"
          />

          {errors.contactMessage && (
            <p className="mt-2 text-red-500 ">
              {errors.contactMessage.message}
            </p>
          )}
        </div>

        <input
          type="submit"
          value="Submit"
          className="bg-yellow-500 text-black px-6 py-3 mt-6 rounded cursor-pointer hover:bg-yellow-400 transition-all duration-300 w-full sm:w-auto"
        />
      </div>
    </form>
  );
};

export default Contactform;
