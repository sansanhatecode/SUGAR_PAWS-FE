"use client";
import React, { useState } from "react";
import { useGetMyAddresses } from "@/hooks/queries/useAddress";
import { Spinner } from "@/components/ui/Spinner";
import { AddressModal } from "@/components/user/AddressModal";
import { AddressSelectModal } from "./AddressSelectModal";

const CheckoutAddress = () => {
  const { data: addresses = [], isLoading } = useGetMyAddresses();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectModalOpen, setSelectModalOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );

  // Find default address
  const defaultAddress =
    addresses.find((addr) => addr.isDefault) || addresses[0];

  React.useEffect(() => {
    if (defaultAddress) setSelectedAddressId(defaultAddress.id);
  }, [addresses, defaultAddress]);

  const selectedAddress =
    addresses.find((addr) => addr.id === selectedAddressId) || defaultAddress;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold text-lg text-custom-purple">
          Shipping Address
        </div>
        <button
          className="text-custom-rose hover:underline text-sm"
          onClick={() => setSelectModalOpen(true)}
        >
          Change
        </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-4">
          <Spinner size="md" />
        </div>
      ) : selectedAddress ? (
        <>
          <div className="text-base font-medium">
            {selectedAddress.fullName}
            <span className="font-normal">
              {" "}
              ({selectedAddress.phoneNumber})
            </span>
          </div>
          <div className="text-sm text-gray-600">
            {selectedAddress.homeNumber}, {selectedAddress.ward.name},{" "}
            {selectedAddress.ward.district.name},{" "}
            {selectedAddress.ward.district.city.name}
          </div>
          {selectedAddress.moreDetail && (
            <div className="text-gray-500 text-xs mt-1">
              {selectedAddress.moreDetail}
            </div>
          )}
        </>
      ) : (
        <div className="text-gray-500 text-sm">No shipping address found.</div>
      )}
      <AddressSelectModal
        open={selectModalOpen}
        onClose={() => setSelectModalOpen(false)}
        selectedAddressId={selectedAddressId}
        setSelectedAddressId={(id) => {
          setSelectedAddressId(id);
          setSelectModalOpen(false);
          if (id === null) setModalOpen(true); // open add new address modal
        }}
      />
      <AddressModal
        addressId={null}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        setSelectedAddressId={setSelectedAddressId}
      />
    </div>
  );
};

export default CheckoutAddress;
