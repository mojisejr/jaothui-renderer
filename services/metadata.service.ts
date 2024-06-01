import dotenv from "dotenv";
dotenv.config();
import { viem } from "../blockchain/viem";
import { abi, address } from "../blockchain/metadata/abi";
import { Address } from "viem";
import { Metadata } from "../interfaces/metadata";
import { prisma } from "../database/prisma";

export const getMetadataByMicrochipId = async (microchipId: string) => {
  try {
    const data = (await viem.readContract({
      address: address as Address,
      abi,
      functionName: "getMetadataByMicrochip",
      args: [microchipId],
    })) as Metadata;

    const certificationData = await isCertificateActivated(microchipId);

    const parsed = {
      ...data!,
      birthdate: +data.birthdate!.toString(),
      height: +data.height.toString(),
      certify: {
        ...data.certify,
        issuedAt: +data.certify.issuedAt.toString(),
      },
      createdAt: +data.createdAt.toString(),
      updatedAt: +data.updatedAt.toString(),
      certificate: certificationData,
    };

    return parsed;
  } catch (error) {
    console.log(error);
  }
};

export const isCertificateActivated = async (microchip: string) => {
  const found = await prisma.certificate.findUnique({
    where: { microchip, isActive: true },
    include: {
      approvers: {
        include: { user: true },
      },
    },
  });

  // const year = +dayjs(found?.updatedAt).format("YYYY") + 543;

  return found && found.isActive
    ? {
        ...found,
        updatedAt: found.updatedAt.getTime(),
        year: found?.updatedAt.getFullYear() + 543,
      }
    : null;
};
