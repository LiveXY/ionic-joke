//
//  DeviceInfoHelper.h
//  UpUpGameCommonInterface
//
//  Created by qiming on 15-4-17.
//  Copyright (c) 2015年 UpUpGameCommonInterface. All rights reserved.
//

#ifndef __UpUpGameCommonInterface__DeviceInfoHelper__
#define __UpUpGameCommonInterface__DeviceInfoHelper__

enum eDeviceInfo
{
    eDeviceInfo_SystemVersion,
    eDeviceInfo_PhoneModel,
    eDeviceInfo_DeviceId,
    eDeviceInfo_DeviceName,
    eDeviceInfo_DevicePool
};

#import <Foundation/Foundation.h>

@interface DeviceInfoHelper : NSObject
{
    
}

@property (nonatomic, copy) NSString *strDeviceID;
@property (nonatomic, copy) NSString *strVendorID;


+(DeviceInfoHelper*) currentDeviceInfo;

- (NSString*) geteDeviceInfo:(int) eType;

@end

#endif /* defined(__UpUpGameCommonInterface__DeviceInfoHelper__) */
