import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { CreateUser, deleteUser, updateUser } from "@/lib/actions/user.actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, phone_numbers } =
      evt.data;
    const fullName = first_name + " " + last_name;
    const user = {
      name: fullName,
      clerkId: id,
      email: email_addresses[0].email_address,
      phone: phone_numbers[0].phone_number,
    };
    const newUser = await CreateUser(user);
    if (newUser) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser._id,
        },
      });
    }
    return NextResponse.json({ message: "OK", user: newUser });
  }
  //   if (eventType === "user.updated") {
  //     const { id, first_name, last_name, phone_numbers } = evt.data;
  //     const fullName = first_name + " " + last_name;
  //     const phoneNumber = phone_numbers[0].toString();
  //     const user = {
  //       name: fullName,
  //       phone: phoneNumber,
  //     };

  //     const updatedUser = await updateUser(id, user);

  //     return NextResponse.json({ message: "OK", user: updatedUser });
  //   }

  //   if (eventType === "user.deleted") {
  //     const { id } = evt.data;

  //     const deletedUser = await deleteUser(id!);

  //     return NextResponse.json({ message: "OK", user: deletedUser });
  //   }

  return new Response("", { status: 200 });
}
