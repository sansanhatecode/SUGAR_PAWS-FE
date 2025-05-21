"use client";
import React, { useState, useEffect } from "react";
import { useGetMyAddresses } from "@/hooks/queries/useAddress";
import { Spinner } from "@/components/ui/Spinner";
import { AddressModal } from "@/components/user/AddressModal";
import { AddressSelectModal } from "./AddressSelectModal";

interface CheckoutAddressProps {
  setSelectedAddressId: (id: number | null) => void;
}

const CheckoutAddress: React.FC<CheckoutAddressProps> = ({
  setSelectedAddressId,
}) => {
  const { data: addresses = [], isLoading } = useGetMyAddresses();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectModalOpen, setSelectModalOpen] = useState(false);
  const [localSelectedAddressId, setLocalSelectedAddressId] = useState<
    number | null
  >(null);

  // Find default address
  const defaultAddress =
    addresses.find((addr) => addr.isDefault) || addresses[0];

  // Update both local and parent state when address changes
  useEffect(() => {
    if (defaultAddress) {
      setLocalSelectedAddressId(defaultAddress.id);
      setSelectedAddressId(defaultAddress.id);
    }
  }, [addresses, defaultAddress, setSelectedAddressId]);

  const selectedAddress =
    addresses.find((addr) => addr.id === localSelectedAddressId) ||
    defaultAddress;

  // Handle address selection
  const handleAddressSelected = (id: number | null) => {
    setLocalSelectedAddressId(id);
    setSelectedAddressId(id);
    setSelectModalOpen(false);
    if (id === null) setModalOpen(true); // open add new address modal
  };

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
        selectedAddressId={localSelectedAddressId}
        setSelectedAddressId={handleAddressSelected}
      />
      <AddressModal
        addressId={null}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        setSelectedAddressId={(id) => {
          setLocalSelectedAddressId(id);
          setSelectedAddressId(id);
        }}
      />
    </div>
  );
};

export default CheckoutAddress;
