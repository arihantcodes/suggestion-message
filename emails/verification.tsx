import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface VerificationProps {
  username: string;
  otp: string; 
}

export default function Verification({ username, otp }: VerificationProps) {
    return(
        <Html lang="en" dir='ltr'>
            <Head>
                <title>Verifaction Code</title>
                <Font fontFamily="Roboto" fallbackFontFamily="Verdana"
                webFont={{
                    url:'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxK.woff2',
                    format: 'woff2',
                }}
                fontWeight={400}
                fontStyle="normal"
                />
            </Head>
            <Preview>
                Here&apos;s your verification code: {otp}
            </Preview>
            
                <Section>
                    <Row>
                        <Heading>Hi {username},</Heading>
                    </Row>
                    <Row>
                        <Text>
                            Please use the following OTP to verify your email address.
                        </Text>
                    </Row>
                    <Row>
                        <Text>
                            OTP: {otp}
                        </Text>
                    </Row>
                    {/* <Row>
                        <Button href="https://example.com/verify">Verify</Button>
                    </Row> */}
                </Section>
            
        </Html>
    )
}