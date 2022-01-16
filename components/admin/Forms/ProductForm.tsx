import { Controller, useForm } from "react-hook-form";
import { Product } from "@/types/global";
import { LoadingSpinner } from "../LoadingSpinner";
import { Input } from "../Input";
import { Editor } from "../Editor";

interface ProductFormProps {
  className?: string;
  product?: Product;
  pending?: boolean;
  onSaveProduct: (product: Product) => void;
}

const DEFAULT_PRODUCT: Product = {
  name: "",
  description: {},
  image: "",
  price: null,
  etsyLink: "",
};

export const ProductForm: React.FC<ProductFormProps> = ({
  product = DEFAULT_PRODUCT,
  pending,
  onSaveProduct,
}) => {
  const { register, control, handleSubmit } = useForm<Product>({
    defaultValues: { ...product },
  });

  return (
    <form
      className="flex flex-col w-full"
      onSubmit={handleSubmit(onSaveProduct)}
    >
      <div className="flex mb-8">
        <div className="flex flex-col w-1/2">
          <div className="mb-4">
            <Input
              register={register}
              label="Name"
              name="name"
              type="text"
              placeholder="Product Name"
            />
          </div>

          <div className="mb-4">
            <Controller
              name="price"
              render={(props) => (
                <input
                  type="number"
                  name="price"
                  placeholder="Product price (in gbp)"
                  {...props}
                  onChange={(e) => {
                    props.field.onChange(parseInt(e.target.value, 10));
                  }}
                />
              )}
              control={control}
            />
            <Input
              register={register}
              options={{
                valueAsNumber: true,
              }}
              label="price"
              name="price"
              type="number"
              placeholder="Product price (in gbp)"
            />
          </div>

          <div>
            <Input
              register={register}
              type="url"
              label="Etsy Link"
              name="etsyLink"
              placeholder="Etsy Link"
            />
          </div>
        </div>

        <div className="w-1/2 ml-8">
          <span className="uppercase block text-gray-700 text-sm font-bold mb-2">
            Image
          </span>
          IMAGE SELECTOR
          {/* <ImageSelector bind:image={$product.image} /> */}
        </div>
      </div>

      <div className="mb-8">
        <span className="uppercase block text-gray-700 text-sm font-bold mb-2">
          Description
        </span>
        <div className="h-24">
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <Editor value={value} onChange={onChange} />
            )}
          />
        </div>
      </div>

      <div className="flex items-center border-t-2 border-slate-300 pt-4 h-24">
        <button
          className="btn-admin btn-primary mr-4"
          type="submit"
          disabled={pending} // @TODO Check from react hook form
        >
          {pending ? <LoadingSpinner /> : "Save Product"}
        </button>
      </div>
    </form>
  );
};
