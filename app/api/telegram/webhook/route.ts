import {
    NextRequest,
    NextResponse
}
    from "next/server";


import { prisma }
    from "@/lib/prisma";


import {
    sendTelegramMessage
}
    from "@/lib/telegram";


import {
    phoneKeyboard,
    genderKeyboard,
    countryKeyboard
}
    from "@/lib/keyboards";



export async function POST(
    req: NextRequest
) {


    try {


        const body =
            await req.json();



        const message =
            body.message;



        if (!message)
            return NextResponse.json({
                ok: true
            });



        const user =
            message.from;



        const telegramId =
            String(user.id);



        let dbUser =
            await prisma.telegramUser.findUnique({

                where: {
                    telegramId: telegramId
                }

            });




        // FIRST MESSAGE

        if (message.text === "/start") {


            dbUser =
                await prisma.telegramUser.upsert({

                    where: {
                        telegramId: telegramId
                    },

                    update: {
                        lastActive: new Date()
                    },

                    create: {

                        telegramId: telegramId,

                        firstName: user.firstName,

                        lastName: user.lastName,

                        username: user.username,

                        languageCode: user.languageCode,

                        step: "PHONE",
                        lastActive: new Date(),
                        chatId: telegramId

                    }

                });



            await sendTelegramMessage(

                telegramId,

                "Welcome!\n\nPlease share your phone number.",

                phoneKeyboard()

            );


            return NextResponse.json({
                ok: true
            });

        }



        // PHONE RECEIVED


        if (message.contact) {


            await prisma.telegramUser.update({

                where: {
                    telegramId: telegramId
                },

                data: {

                    lastActive: new Date(),

                    phone:
                        message.contact.phone_number,

                    step: "COUNTRY"

                }

            });



            await sendTelegramMessage(

                telegramId,

                "Select your country:",

                countryKeyboard()

            );


            return NextResponse.json({
                ok: true
            });

        }




        // COUNTRY


        if (
            dbUser?.step === "COUNTRY"
        ) {


            await prisma.telegramUser.update({

                where: {
                    telegramId: telegramId
                },

                data: {

                    lastActive: new Date(),

                    country:
                        message.text,

                    step: "GENDER"

                }

            });



            await sendTelegramMessage(

                telegramId,

                "Select your gender:",

                genderKeyboard()

            );



            return NextResponse.json({
                ok: true
            });

        }




        // GENDER


        if (
            dbUser?.step === "GENDER"
        ) {


            await prisma.telegramUser.update({

                where: {
                    telegramId: telegramId
                },

                data: {

                    lastActive: new Date(),

                    gender:
                        message.text,

                    step: "DONE"

                }

            });



            await sendTelegramMessage(

                telegramId,

                "✅ Registration completed!"

            );



            return NextResponse.json({
                ok: true
            });

        }



        return NextResponse.json({
            ok: true
        });



    }

    catch (error) {


        console.error(error);


        return NextResponse.json(
            {
                ok: false
            },
            {
                status: 500
            }
        );


    }

}