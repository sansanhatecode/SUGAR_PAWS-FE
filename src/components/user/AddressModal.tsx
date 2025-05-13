/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { City, District, ShippingAddress, Ward } from "@/types/address";
import {
  useGetAddressById,
  useUpdateAddress,
  useCreateAddress, // thêm dòng này
  useGetAllCities,
  useGetDistrictsByCityId,
  useGetWardsByDistrictId,
} from "@/hooks/queries/useAddress";
import { Spinner } from "@/components/ui/Spinner";
import { RiArrowDownSLine, RiCloseLine } from "react-icons/ri";

interface AddressModalProps {
  addressId: number | null;
  open: boolean;
  onClose: () => void;
  setSelectedAddressId: (id: number | null) => void;
}

export const AddressModal: React.FC<AddressModalProps> = ({
  addressId,
  open,
  onClose,
  setSelectedAddressId,
}) => {
  const { data: address, isLoading } = useGetAddressById(addressId ?? 0);
  const updateAddressMutation = useUpdateAddress();
  const createAddressMutation = useCreateAddress(); // thêm dòng này
  const { register, handleSubmit, reset } = useForm<ShippingAddress>();
  const [selectedCity, setSelectedCity] = React.useState<number | null>(
    address?.ward.district.city.cityCode ?? null
  );
  const [selectedDistrict, setSelectedDistrict] = React.useState<number | null>(
    null
  );

  const { data: cities, isLoading: isCitiesLoading } = useGetAllCities();
  const { data: districts, isLoading: isDistrictsLoading } =
    useGetDistrictsByCityId(selectedCity ?? 0);
  const { data: wards, isLoading: isWardsLoading } = useGetWardsByDistrictId(
    selectedDistrict ?? 0
  );

  useEffect(() => {
    if (addressId && address) {
      // Gán dữ liệu vào form
      reset({
        fullName: address.fullName,
        phoneNumber: address.phoneNumber,
        wardCode: address.ward.wardCode,
        homeNumber: address.homeNumber,
        moreDetail: address.moreDetail,
      });

      // Gán giá trị mặc định cho các dropdown
      setSelectedCity(address.ward.district.city.cityCode);
      setSelectedDistrict(address.ward.district.districtCode);
    } else {
      // Nếu là tạo mới (addressId null)
      reset();
      setSelectedCity(null);
      setSelectedDistrict(null);
    }
  }, [addressId, address, reset]);
  

  const onSubmit = (data: ShippingAddress) => {
    data.wardCode = Number(data.wardCode);
    if (addressId) {
      updateAddressMutation.mutate(
        { id: addressId, params: data },
        {
          onSuccess: () => {
            setSelectedAddressId(null);
            onClose();
          },
        }
      );
    } else {
      createAddressMutation.mutate(data, {
        onSuccess: () => {
          setSelectedAddressId(null);
          onClose();
        },
      });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl relative">
        <button
          className="absolute top-8 right-8 text-gray-400 hover:text-gray-700"
          onClick={() => {
            setSelectedAddressId(null);
            onClose();
          }}
        >
          <RiCloseLine size={28} />
        </button>
        <h3 className="text-xl font-bold mb-6 text-custom-wine">
          Update Address
        </h3>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Spinner size="md" />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* House Number & Phone Number side by side */}
            <div className="flex gap-2">
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Full Name</label>
                <input
                  {...register("fullName", { required: true })}
                  placeholder="Full Name"
                  className="border rounded p-2 focus:border-custom-wine focus:ring-1 focus:ring-custom-wine transition"
                />
              </div>
              <div className="flex flex-col flex-1">
                <label className="font-semibold mb-1">Phone Number</label>
                <input
                  {...register("phoneNumber", { required: true })}
                  placeholder="Phone Number"
                  className="border rounded p-2 focus:border-custom-wine focus:ring-1 focus:ring-custom-wine transition"
                />
              </div>
            </div>
            {/* City/Province */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">City (Province)</label>
              <div className="relative">
                <select
                  className="border rounded-xl p-2 w-full appearance-none focus:border-custom-wine focus:ring-1 focus:ring-custom-wine transition pr-10"
                  value={selectedCity ?? ""}
                  onChange={(e) => {
                    setSelectedCity(Number(e.target.value));
                    setSelectedDistrict(null);
                    reset({ ...address, wardCode: undefined });
                  }}
                  disabled={isCitiesLoading}
                >
                  <option value="">Select City/Province</option>
                  {cities?.map((city: City) => (
                    <option key={city.cityCode} value={city.cityCode}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <RiArrowDownSLine className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
              </div>
            </div>

            {/* District */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">District</label>
              <div className="relative">
                <select
                  className="border rounded-xl p-2 w-full appearance-none focus:border-custom-wine focus:ring-1 focus:ring-custom-wine transition pr-10"
                  value={selectedDistrict ?? ""}
                  onChange={(e) => {
                    setSelectedDistrict(Number(e.target.value));
                    reset({ ...address, wardCode: undefined });
                  }}
                  disabled={!selectedCity || isDistrictsLoading}
                >
                  <option value="">Select District</option>
                  {districts?.map((district: District) => (
                    <option
                      key={district.districtCode}
                      value={district.districtCode}
                    >
                      {district.name}
                    </option>
                  ))}
                </select>
                <RiArrowDownSLine className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
              </div>
            </div>

            {/* Ward */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Ward</label>
              <div className="relative">
                <select
                  className="border rounded-xl p-2 w-full appearance-none focus:border-custom-wine focus:ring-1 focus:ring-custom-wine transition pr-10"
                  {...register("wardCode", {
                    required: true,
                    setValueAs: (v) => (v === "" ? undefined : Number(v)), // ép kiểu về number
                  })}
                  disabled={!selectedDistrict || isWardsLoading}
                  defaultValue={address?.ward.wardCode ?? ""}
                >
                  <option value="">Select Ward</option>
                  {wards?.map((ward: Ward) => (
                    <option key={ward.wardCode} value={ward.wardCode}>
                      {ward.name}
                    </option>
                  ))}
                </select>
                <RiArrowDownSLine className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <label className="font-semibold mb-1">House Number</label>
              <input
                {...register("homeNumber", { required: true })}
                placeholder="House Number"
                className="border rounded p-2 focus:border-custom-wine focus:ring-1 focus:ring-custom-wine transition"
              />
            </div>
            {/* More Detail */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">More Detail</label>
              <input
                {...register("moreDetail")}
                placeholder="More Detail"
                className="border rounded p-2 focus:border-custom-wine focus:ring-1 focus:ring-custom-wine transition"
              />
            </div>
            <button
              type="submit"
              className="bg-custom-wine text-white px-4 py-2 rounded font-semibold hover:bg-custom-pink transition"
            >
              Save
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
